import { Franchise } from '../../entities/Franchise';
import { Metadata } from '../../entities/MetadataFranchise';
import { CharacterFranchise } from '../../entities/CharacterFranchise';

export interface CharacterFranchisePort {
    fetchCharacter(
        franchise: Franchise,
        version: string,
        metadata: Metadata,
        config: Record<string, unknown>
    ): Promise<CharacterFranchise>;
}