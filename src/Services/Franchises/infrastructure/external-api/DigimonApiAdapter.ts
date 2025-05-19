import { CharacterFranchisePort } from "../../domain/ports/output/CharacterFranchisePort";

import { Franchise } from "../../domain/entities/Franchise";
import { Metadata } from "../../domain/entities/MetadataFranchise";
import { CharacterFranchise } from "../../domain/entities/CharacterFranchise";

export class DigimonApiAdapter implements CharacterFranchisePort {
    async fetchCharacter(
        franchise: Franchise,
        version: string,
        metadata: Metadata,
        config: Record<string, unknown>
    ): Promise<CharacterFranchise> {
        if (franchise !== Franchise.DIGIMON) {
            throw new Error("Invalid franchise");
        }

        const { id } = metadata;
        if (!id || typeof id !== "number") {
            throw new Error("Invalid or missing id in metadata");
        }

        const { baseUrl } = config;
        if (!baseUrl || typeof baseUrl !== 'string') {
            throw new Error("Missing or invalid 'baseUrl' in config");
        }

        const data = await this.getDigimonData(id, baseUrl);
        const powers = data.skills.map((power: any) => power.skill);
        const evolutions = await this.getEvolutions(data);

        return {
            name: data.name,
            powers: powers,
            evolutions: evolutions
        }
    }

    private async getDigimonData(id: number, baseUrl: string): Promise<any> {
        const response = await fetch(`${baseUrl}/digimon/${id}`);
        const data = await response.json();
        return data;
    }

    private async getEvolutions(data: any): Promise<string[]> {
        const evolutions = data.nextEvolutions.map((evolution: any) => evolution.digimon);
        return evolutions;
    }
}