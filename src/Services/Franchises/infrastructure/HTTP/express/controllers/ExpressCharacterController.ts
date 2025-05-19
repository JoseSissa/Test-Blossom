import { Request, Response } from "express";

import { fetchCharacterData } from "../../../../application/use-cases/FetchCharacterData";
import { Franchise } from "../../../../domain/entities/Franchise";

export class ExpressCharacterController {
    constructor(private readonly fetchCharacterData: fetchCharacterData) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { franchise, version } = req.params;
            const metadata = JSON.parse(req.query.metadata as string);
            const config = JSON.parse(req.query.config as string);

            if (!Object.values(Franchise).includes(franchise as Franchise)) {
                res.status(400).json({ error: "Invalid franchise" });
                return;
            }

            const result = await this.fetchCharacterData.run({
                franchise: franchise as Franchise,
                version,
                metadata,
                config
            });

            res.status(200).json(result);

        } catch (error: any) {
            res.status(500).json({ error: error.message || "Internal Server Error" });
        }
    }
}