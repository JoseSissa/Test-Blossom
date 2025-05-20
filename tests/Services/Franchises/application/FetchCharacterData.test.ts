import { CharacterFranchisePort } from "../../../../src/Services/Franchises/domain/ports/output/CharacterFranchisePort";
import { SaveLoggerPort } from "../../../../src/Services/Franchises/domain/ports/output/SaveLoggerPort";

import { fetchCharacterData } from "../../../../src/Services/Franchises/application/use-cases/FetchCharacterData";

import { Franchise } from "../../../../src/Services/Franchises/domain/entities/Franchise";

import { MOCK_FETCH_DATA } from "../__mocks__/mocks";


describe('Fetch character data', () => {
    // Pokemon
    const mockFetchCharacterPortPokemon: CharacterFranchisePort = {
        fetchCharacter: jest.fn().mockResolvedValue(MOCK_FETCH_DATA.pokemon.mockCharacterData)
    }
    const mockSaveLoggerPortPokemon: SaveLoggerPort = {
        saveLogger: jest.fn().mockResolvedValue(MOCK_FETCH_DATA.pokemon.mockLoggerFranchise)
    }

    // Digimon
    const mockFetchCharacterPortDigimon: CharacterFranchisePort = {
        fetchCharacter: jest.fn().mockResolvedValue(MOCK_FETCH_DATA.digimon.mockCharacterData)
    }
    const mockSaveLoggerPortDigimon: SaveLoggerPort = {
        saveLogger: jest.fn().mockResolvedValue(MOCK_FETCH_DATA.digimon.mockLoggerFranchise)
    }

    const useCasePokemon = new fetchCharacterData(mockFetchCharacterPortPokemon, mockSaveLoggerPortPokemon);
    const useCaseDigimon = new fetchCharacterData(mockFetchCharacterPortDigimon, mockSaveLoggerPortDigimon);

    test('Pokemon: Should return a character data', async () => {
        const result = await useCasePokemon.run(MOCK_FETCH_DATA.pokemon.mockDataFetch)
        expect(mockFetchCharacterPortPokemon.fetchCharacter).toHaveBeenCalledTimes(1)
        expect(result).toEqual(MOCK_FETCH_DATA.pokemon.mockCharacterData)
        // Should call saveLogger with success status
        expect(mockSaveLoggerPortPokemon.saveLogger).toHaveBeenCalledWith(expect.objectContaining({
            franchise: Franchise.POKEMON,
            version: "v1",
            metadata: { name: "pikachu" },
            status: "success"
        }));
    });

    test('Digimon: Should return a character data', async () => {
        const result = await useCaseDigimon.run(MOCK_FETCH_DATA.digimon.mockDataFetch)
        expect(mockFetchCharacterPortDigimon.fetchCharacter).toHaveBeenCalledTimes(1)
        expect(result).toEqual(MOCK_FETCH_DATA.digimon.mockCharacterData)
        // Should call saveLogger with success status
        expect(mockSaveLoggerPortDigimon.saveLogger).toHaveBeenCalledWith(expect.objectContaining({
            franchise: Franchise.DIGIMON,
            version: "v1",
            metadata: { id: 100 },
            status: "success"
        }));
    });

});