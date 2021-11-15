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

export function messagesIo(): IMessages[] {

    const messagesQueue: IMessages[] = []

    console.log(messagesQueue)

    const socket = io(`${import.meta.env.VITE_BASE_URL}`)

    socket.on('new_message', (newMessage: IMessages) => {
        messagesQueue.push(newMessage)
    })

    return messagesQueue;
}