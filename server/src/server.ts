import { serverHttp } from "./app";

serverHttp.listen(4000, () => console.log(`server is run on PORT ${4000}`));