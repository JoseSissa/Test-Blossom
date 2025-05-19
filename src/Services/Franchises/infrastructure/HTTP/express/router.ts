import { Router } from "express";
import { expressCharacterController, expressListCharacterController } from "../../config/DependencyInjection";


const expressRouter = Router();

expressRouter.get("/api/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
});

expressRouter.get("/api/:franchise/:version", (req, res) => {
    expressCharacterController.handle(req, res);
});

expressRouter.get("/api/list-characters", (req, res) => {
    expressListCharacterController.handle(req, res);
});

export default expressRouter;