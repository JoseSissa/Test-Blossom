import { CharacterFranchisePort } from "../domain/ports/output/CharacterFranchisePort";
import { SaveLoggerPort } from "../domain/ports/output/SaveLoggerPort";

import { CharacterFranchise } from "../domain/entities/CharacterFranchise";
import { Franchise } from "../domain/entities/Franchise";
import { Metadata } from "../domain/entities/MetadataFranchise";
import { LoggerFranchise } from "../domain/entities/LoggerFranchise";

type Params = {
    franchise: Franchise;
    version: string;
    metadata: Metadata;
    config: Record<string, unknown>;
}

export class fetchCharacterData {
    constructor(
        private readonly characterFranchisePort: CharacterFranchisePort,
        private readonly savedLoggerPort: SaveLoggerPort
    ) { }

    async run(params: Params): Promise<CharacterFranchise> {
        const { franchise, version, metadata, config } = params;
        const timeStamp = new Date();

        try {
            const characterData = await this.characterFranchisePort.fetchCharacter(franchise, version, metadata, config);

            const successLogger: LoggerFranchise = {
                franchise,
                version,
                metadata,
                timestamp: timeStamp,
                status: 'success',
                errorMessage: undefined
            };

            await this.savedLoggerPort.saveLogger(successLogger);

            return characterData;
        } catch (error: any) {
            const failLogger: LoggerFranchise = {
                franchise,
                version,
                metadata,
                timestamp: timeStamp,
                status: 'fail',
                errorMessage: error.message || "Unknown error",
            };

            await this.savedLoggerPort.saveLogger(failLogger);

            throw error;
        }
    }
}