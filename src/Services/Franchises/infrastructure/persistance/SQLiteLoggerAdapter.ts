import * as path from "path";
import * as sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

import { ListCharacterSavedPort } from "../../domain/ports/output/ListCharacterSavedPort";
import { LoggerFranchise } from "../../domain/entities/LoggerFranchise";



export class SQLiteLoggerAdapter implements ListCharacterSavedPort {
    private db!: Database;

    constructor(private dbPath: string = path.resolve(__dirname, "SQLite-db/logs.db")) { }

    async init(): Promise<void> {
        this.db = await open({
            filename: this.dbPath,
            driver: sqlite3.Database
        });

        await this.db.exec(`
      CREATE TABLE IF NOT EXISTS request_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        franchise TEXT NOT NULL,
        version TEXT NOT NULL,
        metadata TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        status TEXT NOT NULL,
        errorMessage TEXT
      );
    `);
    }

    async saveLogger(log: LoggerFranchise): Promise<void> {
        if (!this.db) {
            throw new Error("Database not initialized. Call init() first.");
        }

        await this.db.run(
            `
        INSERT INTO request_logs (
          franchise, version, metadata, timestamp, status, errorMessage
        ) VALUES (?, ?, ?, ?, ?, ?);
      `,
            [
                log.franchise,
                log.version,
                JSON.stringify(log.metadata),
                log.timestamp.toISOString(),
                log.status,
                log.errorMessage ?? null
            ]
        );
    }

    async listCharacters(): Promise<LoggerFranchise[]> {
        if (!this.db) {
            throw new Error("Database not initialized. Call init() first.");
        }
        const logs = await this.db.all(`SELECT * FROM request_logs;`);

        return logs.map((log: any) => ({
            franchise: log.franchise,
            version: log.version,
            metadata: JSON.parse(log.metadata),
            timestamp: new Date(log.timestamp),
            status: log.status,
            errorMessage: log.errorMessage ?? null
        }));
    }
}