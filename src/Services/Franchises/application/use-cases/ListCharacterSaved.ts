import { ListCharacterSavedPort } from "../../domain/ports/output/ListCharacterSavedPort";
import { LoggerFranchise } from "../../domain/entities/LoggerFranchise";

export class ListCharacterSaved {
    constructor(private readonly listCharacterSavedPort: ListCharacterSavedPort) { }

    async run(): Promise<LoggerFranchise[]> {
        return await this.listCharacterSavedPort.listCharacters();
    }
}