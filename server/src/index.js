import express from "express";
import { existsSync, mkdirSync } from 'fs'
import _applyMiddlewares from "lib/server/middlewares";
import _applyRoutes from "lib/server/routes";
import 'lib/global'
import path from 'path'

const app = express();

_applyMiddlewares(app);
_applyRoutes(app);

const publicDirectory = path.join(process.cwd(), '/src/public')

if (!existsSync(publicDirectory)) {
  mkdirSync(publicDirectory)
}

app.listen(4313, () => console.log("app is running on port 4313"));
