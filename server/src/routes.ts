import { Router } from 'express';
import { GithubUserController } from './controller/GithubUserController';
import { AuthenticateUserController } from './controller/AuthenticateUserController';
import { CreateMessageController } from './controller/CreateMessageController';

import { ensureAuthenticated } from './middleware/ensureAuthenticated';
import { GetLasThreeMessagesController } from './controller/GetLasThreeMessagesController';
import { ProfileUserController } from './controller/ProfileUserController';

const router = Router()

router.get("/github", new GithubUserController().handleRedirect);
router.get("/signin/callback", new GithubUserController().handleCode);

router.post("/authenticate", new AuthenticateUserController().handle);
router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);
router.get("/messages/lasthree", new GetLasThreeMessagesController().handle);
router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router }