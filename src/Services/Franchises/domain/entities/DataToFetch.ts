import { Franchise } from './Franchise';
import { Metadata } from './MetadataFranchise';

export interface DataToFetch {
    franchise: Franchise,
    version: string,
    metadata: Metadata,
    config: Record<string, unknown>
}