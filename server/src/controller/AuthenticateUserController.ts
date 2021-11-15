import { Request, Response } from 'express'
import { AxiosError } from 'axios'
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
    async handle(request: Request, response: Response) {

        try {
            const { code } = request.body;

            const service = new AuthenticateUserService();
            const result = await service.execute(code)

            return response.json(result)
        } catch (error) {

            const { message, response: { status, statusText } }: AxiosError = error
            const resp = { message, statusText, status }

            return response.status(status).send(resp).json()
        }

    }
}

export { AuthenticateUserController }