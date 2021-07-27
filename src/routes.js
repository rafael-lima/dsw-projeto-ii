import { Router } from "express";

import UserController from "./controllers/UserController";
import TaskController from "./controllers/TaskController";

const routes = new Router();

routes.get("/", (req, res) => res.send(""));

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.create);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

routes.get("/users/:user_id/tasks", TaskController.index);
routes.get("/users/:user_id/tasks/:id", TaskController.show);
routes.post("/users/:user_id/tasks", TaskController.create);
routes.put("/users/:user_id/tasks/:id", TaskController.update);
routes.delete("/users/:user_id/tasks/:id", TaskController.destroy);
routes.delete("/users/:user_id/tasks", TaskController.destroyAll);

export default routes;