import { Request, Response } from "express";

import { ListCharacterSaved } from "../../../../application/use-cases/ListCharacterSaved";

export class ExpressListCharacterController {
    constructor(private readonly listCharacterSaved: ListCharacterSaved) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.listCharacterSaved.run();

            res.status(200).json(result);

        } catch (error: any) {
            res.status(500).json({ error: error.message || "Internal Server Error" });
        }
    }
}