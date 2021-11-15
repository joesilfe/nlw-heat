import { useEffect, useState } from 'react'

import styles from './styles.module.scss'
import logoUmg from '../../assets/logo.svg'

import { api } from '../../services/axios/api'
import io from 'socket.io-client'


interface IMessages {
    created_at: Date,
    id: string,
    text: string,
    user: {
        name: string
        avatar_url: string,
    }
}


const messagesQueue: IMessages[] = []

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

socket.on('new_message', (newMessage: IMessages) => {
    messagesQueue.push(newMessage)
})


export function MessageList() {

    const [messages, setMessages] = useState<IMessages[]>([])

    console.log(messages)

    useEffect(() => {
        setInterval(() => {
            if (messagesQueue.length > 0) {
                setMessages(prevState => [
                    messagesQueue[0],
                    prevState[0],
                    prevState[1]
                ].filter(Boolean))

                messagesQueue.shift()
            }
        }, 3000)
    })

    useEffect(() => {
        api.get<IMessages[]>('messages/lasthree')
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoUmg} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                {messages.map(item => {
                    return (
                        <li className={styles.message} key={item.id}>
                            <p className={styles.messageContent}>{item.text}</p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img src={item.user.avatar_url} alt={item.user.name} />
                                </div>
                                <span>{item.user.name}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}