import { LoggerFranchise } from "../../entities/LoggerFranchise";

export interface ListCharacterSavedPort {
    listCharacters(): Promise<LoggerFranchise[]>;
}