// Entities
import { Franchise } from "../../domain/entities/Franchise";
import { Metadata } from "../../domain/entities/MetadataFranchise";

// API adapters
import { PokemonApiAdapter } from "../external-api/PokemonApiAdapter";
import { DigimonApiAdapter } from "../external-api/DigimonApiAdapter";

// Adapters to save data
import { InMemoryLoggerAdapter } from "../persistance/InMemoryLoggerAdapter";
import { SQLiteLoggerAdapter } from "../persistance/SQLiteLoggerAdapter";

// Use cases
import { fetchCharacterData } from "../../application/use-cases/FetchCharacterData";
import { ListCharacterSaved } from "../../application/use-cases/ListCharacterSaved";

// Controllers of the Server
import { ExpressCharacterController } from "../HTTP/express/controllers/ExpressCharacterController";
import { ExpressListCharacterController } from "../HTTP/express/controllers/ExpressListCharacterController";


// Adapters
const pokeApiAdapter = new PokemonApiAdapter();
const digiApiAdapter = new DigimonApiAdapter();

// Logger
// Adapter to save data in memory
// const loggerAdapter = new InMemoryLoggerAdapter();

// Adapter to save data in SQLite
const loggerAdapter = new SQLiteLoggerAdapter();
// Function to create db
async function init() {
    await loggerAdapter.init();
}
init();

// Handler dynamically
const dynamicCharacterService = {
    async fetchCharacter(franchise: Franchise, version: string, metadata: Metadata, config: Record<string, unknown>) {
        if (franchise === Franchise.POKEMON) {
            return await pokeApiAdapter.fetchCharacter(franchise, version, metadata, config);
        }
        if (franchise === Franchise.DIGIMON) {
            return await digiApiAdapter.fetchCharacter(franchise, version, metadata, config);
        }
        else {
            throw new Error("Invalid franchise");
        }
    }
}

// Use cases
const fetchCharacter = new fetchCharacterData(dynamicCharacterService, loggerAdapter);
const listCharacterSaved = new ListCharacterSaved(loggerAdapter);


export const expressCharacterController = new ExpressCharacterController(fetchCharacter);
export const expressListCharacterController = new ExpressListCharacterController(listCharacterSaved);