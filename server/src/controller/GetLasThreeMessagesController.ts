import { Request, Response } from "express";
import { GetLasThreeMessagesService } from '../services/GetLasThreeMessagesService'

class GetLasThreeMessagesController {
    async handle(request: Request, response: Response) {

        try {
            const service = new GetLasThreeMessagesService();

            const result = await service.execute();

            return response.json(result);
        } catch (error) {

            return error.status(401).send(error.message).json()
        }

    }
}

export { GetLasThreeMessagesController }