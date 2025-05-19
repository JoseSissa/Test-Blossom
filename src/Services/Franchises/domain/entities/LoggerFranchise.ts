import { Franchise } from './Franchise';
import { Metadata } from './MetadataFranchise';

export interface LoggerFranchise {
    franchise: Franchise;
    version: string;
    metadata: Metadata;
    timestamp: Date;
    status: 'success' | 'fail';
    errorMessage?: string;
}