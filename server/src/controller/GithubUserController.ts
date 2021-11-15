import { Request, Response } from 'express';

class GithubUserController {
    async handleRedirect(request: Request, response: Response) {

        try {

            // Alternative
            // router.get("/github", (request, response) => {
            //     response.redirect(
            //         `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
            // });

            response.redirect(
                `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);

        } catch (error) {
            return response.status(400).send(error.message).json()
        }

    }

    async handleCode(request: Request, response: Response) {

        try {
            const { code } = request.query;

            // Alternative
            // router.get("/signin/callback", (request, response) => {
            //     const { code } = request.query;

            //     return response.json(code);
            // });

            return response.json(code);
        } catch (error) {

            return response.status(400).send(error.message).json()
        }

    }
}

export { GithubUserController }