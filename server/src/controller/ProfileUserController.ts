import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
    async handle(request: Request, response: Response) {

        try {
            const { user_id } = request;

            const service = new ProfileUserService();

            const result = await service.execute(user_id);

            return response.json(result);
        } catch (error) {

            return error.status(401).send(error.message).json()
        }

    }
}

export { ProfileUserController }