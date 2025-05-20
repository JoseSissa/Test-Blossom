import { CharacterFranchise } from "../../../../src/Services/Franchises/domain/entities/CharacterFranchise";
import { LoggerFranchise } from "../../../../src/Services/Franchises/domain/entities/LoggerFranchise";
import { Franchise } from "../../../../src/Services/Franchises/domain/entities/Franchise";
import { DataToFetch } from "../../../../src/Services/Franchises/domain/entities/DataToFetch";


type MOCK_FETCH = {
    mockCharacterData: CharacterFranchise,
    mockDataFetch: DataToFetch,
    mockLoggerFranchise: LoggerFranchise
}

export const MOCK_FETCH_DATA: Record<Franchise, MOCK_FETCH> = {
    [Franchise.POKEMON]: {
        mockCharacterData: {
            name: "pikachu",
            weight: 60,
            powers: ["static", "lightning-rod"],
            evolutions: ["arcanine"]
        },
        mockDataFetch: {
            franchise: Franchise.POKEMON,
            version: "v1",
            metadata: { name: "pikachu" },
            config: { baseUrl: "https://pokeapi.co/api/v2" }
        },
        mockLoggerFranchise: {
            franchise: Franchise.POKEMON,
            version: "v1",
            metadata: { name: "pikachu" },
            timestamp: new Date(),
            status: "success",
            errorMessage: undefined
        }
    },
    [Franchise.DIGIMON]: {
        mockCharacterData: {
            name: "Pitchmon",
            powers: [
                "Shabon no Awa"
            ],
            evolutions: [
                "Tunomon",
                "Ganimon",
                "Marin Angemon",
                "Tokomon",
                "Chapmon",
                "Pukamon",
                "Nyaromon",
                "Shoutmon X7(Superior Mode)"
            ]
        },
        mockDataFetch: {
            franchise: Franchise.DIGIMON,
            version: "v1",
            metadata: { id: 100 },
            config: { baseUrl: "https://digi-api.com/api/v1" }
        },
        mockLoggerFranchise: {
            franchise: Franchise.DIGIMON,
            version: "v1",
            metadata: { id: 100 },
            timestamp: new Date(),
            status: "success",
            errorMessage: undefined
        }
    }
}

export const MOCK_LIST_CHARACTERS: LoggerFranchise[] = [
    {
        franchise: Franchise.POKEMON,
        version: "v1",
        metadata: { name: "pikachu" },
        timestamp: new Date(),
        status: "success",
    },
    {
        franchise: Franchise.DIGIMON,
        version: "classic",
        metadata: { id: 42 },
        timestamp: new Date(),
        status: "fail",
        errorMessage: "Not found"
    }
];