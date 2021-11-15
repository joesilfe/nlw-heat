import { FormEvent, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import style from './styles.module.scss';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/axios/api';

export function SendMessageForm() {

    const { user, signOut } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    async function handrleSendMessage(event: FormEvent) {

        event.preventDefault();

        if (!message.trim()) {
            return;
        }

        await api.post('messages', { message })
            .then(_ => setMessage(''))
            .catch(err => console.log(err))

    }

    return (
        <div className={style.sendMessageFormWrapper}>
            <button type="button" onClick={signOut} className={style.signOutButton}>
                <VscSignOut size="32" />
            </button>

            <header className={style.userInformation}>
                <div className={style.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={style.userName} >{user?.name}</strong>
                <span className={style.userGithub}>
                    <VscGithubInverted size="16" />
                    {user?.login}
                </span>
            </header>

            <form className={style.sendMessageForm} onSubmit={handrleSendMessage}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                    name="message"
                    id="message"
                    placeholder="Qual sua expectativa para o evento?"
                    onChange={event => setMessage(event.target.value)}
                    value={message}
                />
                <button type="submit" >Enviar mensagem</button>
            </form>
        </div>
    )
}