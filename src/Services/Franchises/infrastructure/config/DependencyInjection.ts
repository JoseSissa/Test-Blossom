import { Franchise } from "../../domain/entities/Franchise";
import { Metadata } from "../../domain/entities/MetadataFranchise";

import { PokemonApiAdapter } from "../external-api/PokemonApiAdapter";
import { DigimonApiAdapter } from "../external-api/DigimonApiAdapter";

import { InMemoryLoggerAdapter } from "../persistance/InMemoryLoggerAdapter";

import { fetchCharacterData } from "../../application/use-cases/FetchCharacterData";

import { ExpressCharacterController } from "../HTTP/express/controllers/ExpressCharacterController";


// Adapters
const pokeApiAdapter = new PokemonApiAdapter();
const digiApiAdapter = new DigimonApiAdapter();

// Logger
const loggerAdapter = new InMemoryLoggerAdapter();

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


export const expressCharacterController = new ExpressCharacterController(fetchCharacter);