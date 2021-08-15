import {ProcessStatus} from '../../shared/types/process-status.type';

export interface ProcessResponse {

    id: number;
    name: string;
    description: string;
    creationTimestamp: string;
    modificationTimestamp: string;
    status: ProcessStatus;
    userId: number;
    departmentId: number;

}
