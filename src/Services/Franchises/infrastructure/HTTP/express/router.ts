import { Router } from "express";
import { expressCharacterController } from "../../config/DependencyInjection";


const expressRouter = Router();

expressRouter.get("/api/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
});

expressRouter.get("/api/:franchise/:version", (req, res) => {
    expressCharacterController.handle(req, res);
});

export default expressRouter;