import Express from "express";
import 'dotenv/config'

const server = Express();
server.use(Express.json())

const PORT = 3000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))