import { LoggerFranchise } from "../../entities/LoggerFranchise";

export interface SaveLoggerPort {
    saveLogger(logger: LoggerFranchise): Promise<void>;
}