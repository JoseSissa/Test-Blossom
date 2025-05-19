import { SaveLoggerPort } from "../../domain/ports/output/SaveLoggerPort";
import { LoggerFranchise } from "../../domain/entities/LoggerFranchise";

export class InMemoryLoggerAdapter implements SaveLoggerPort {
    private readonly logs: LoggerFranchise[] = [];

    async saveLogger(log: LoggerFranchise): Promise<void> {
        this.logs.push(log);
    }
}