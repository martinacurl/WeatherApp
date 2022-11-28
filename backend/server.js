import Express from "express";
import "dotenv/config";
import { sqlite3 } from "sqlite3";

const server = Express();
server.use(Express.json());

const PORT = 3000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
