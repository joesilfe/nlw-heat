import prismaClient from '../prisma';

class GetLasThreeMessagesService {
    async execute() {

        const messages = await prismaClient.message.findMany({
            take: 4, // pegas as três ultimas mensagens
            orderBy: {
                created_at: "desc" // ordenar de modo decrescente
            },
            include: {
                user: true
            }
        })

        return messages

    }
}

export { GetLasThreeMessagesService }