import { ListCharacterSavedPort } from "../../../../src/Services/Franchises/domain/ports/output/ListCharacterSavedPort";
import { ListCharacterSaved } from "../../../../src/Services/Franchises/application/use-cases/ListCharacterSaved";
import { LoggerFranchise } from "../../../../src/Services/Franchises/domain/entities/LoggerFranchise";

import { MOCK_LIST_CHARACTERS } from "../__mocks__/mocks";

describe('List saved characters', () => {
    const mockCharacterSaved: LoggerFranchise[] = MOCK_LIST_CHARACTERS

    const mockListCharacterPort: ListCharacterSavedPort = {
        listCharacters: jest.fn().mockResolvedValue(mockCharacterSaved)
    }

    const useCase = new ListCharacterSaved(mockListCharacterPort)


    test('should return a list of saved characters', async () => {
        const result = await useCase.run()
        expect(mockListCharacterPort.listCharacters).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockCharacterSaved)
    })

    test('Returned characters should have valid structure', async () => {
        const result = await useCase.run()

        result.forEach(character => {
            expect(character).toHaveProperty('franchise')
            expect(character).toHaveProperty('version')
            expect(character).toHaveProperty('metadata')
            expect(character).toHaveProperty('timestamp')
            expect(['success', 'fail']).toContain(character.status)
        })
    })

    test('Should return a empty list if no characters are saved', async () => {
        mockListCharacterPort.listCharacters = jest.fn().mockResolvedValue([])
        const result = await useCase.run()
        expect(result).toEqual([])
    })
})