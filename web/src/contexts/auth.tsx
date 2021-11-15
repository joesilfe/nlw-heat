import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/axios/api";


interface IUser {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

interface IAuthContextData {
    user: IUser | null;
    signInUrl: string;
    signOut: () => void;
}

interface IAuthProvider {
    children: ReactNode;
}

interface IAuthResponse {
    token: string,
    user: {
        id: string,
        avatar_url: string,
        name: string,
        login: string,
    }
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider(props: IAuthProvider) {

    const [user, setUser] = useState<IUser | null>(null)

    const signInUrl = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`
    
    async function verifyProfile(token: string) {

        api.defaults.headers.common.authorization = `Bearer ${token}`;

        await api.get<IUser>('profile')
            .then(res => setUser(res.data))
            .catch(err => console.log(err.data))
    }

    async function signIn(githubCode: string) {

        api.post<IAuthResponse>('authenticate', {
            code: githubCode,
        })
            .then(res => {
                const { token, user } = res.data
                localStorage.setItem('@dowhile:token', token)
                setUser(user)
                verifyProfile(token)
            })
            .catch(err => console.log(err))
    }

    async function signOut() {
        setUser(null)
        localStorage.removeItem('@dowhile:token')
    }

    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token');

        if (token) {
            verifyProfile(token)
        }
    }, [])

    useEffect(() => {
        const url = window.location.href
        const hasGithubCode = url.includes('?code=')

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=')

            // Removendo dados da URL
            window.history.pushState({}, '', urlWithoutCode)

            signIn(githubCode)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signInUrl, user, signOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}