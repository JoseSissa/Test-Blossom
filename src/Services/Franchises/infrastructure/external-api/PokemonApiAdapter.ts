import { CharacterFranchisePort } from "../../domain/ports/output/CharacterFranchisePort";

import { Franchise } from "../../domain/entities/Franchise";
import { Metadata } from "../../domain/entities/MetadataFranchise";
import { CharacterFranchise } from "../../domain/entities/CharacterFranchise";

export class PokemonApiAdapter implements CharacterFranchisePort {
    async fetchCharacter(
        franchise: Franchise,
        version: string,
        metadata: Metadata,
        config: Record<string, unknown>
    ): Promise<CharacterFranchise> {
        if (franchise !== Franchise.POKEMON) {
            throw new Error("Invalid franchise");
        }

        const { name } = metadata;
        if (!name || typeof name !== "string") {
            throw new Error("Invalid or missing name in metadata");
        }

        const { baseUrl } = config;
        if (!baseUrl || typeof baseUrl !== "string") {
            throw new Error("Invalid or missing baseUrl in config");
        }

        const data = await this.getPokemonData(name, baseUrl);
        const powers = data.abilities.map((a: any) => a.ability.name)
        const evolutions = await this.getEvolutions(data.id, baseUrl);

        return {
            name: data.name,
            weight: data.weight,
            powers: powers,
            evolutions: evolutions
        };
    }

    private async getPokemonData(name: string, baseUrl: string): Promise<any> {
        const response = await fetch(`${baseUrl}/pokemon/${name}`);
        const data = await response.json();
        return data;
    }

    private async getEvolutions(id: number, baseUrl: string): Promise<string[]> {
        const response = await fetch(`${baseUrl}/evolution-chain/${id}`);
        const data = await response.json();

        let evolutionsChain = data.chain.evolves_to;
        const nameEvolutions = []

        while (evolutionsChain.length > 0) {
            nameEvolutions.push(evolutionsChain[0].species.name);
            evolutionsChain = evolutionsChain[0].evolves_to;
        }

        return nameEvolutions;
    }
}