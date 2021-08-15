import {ProcessStatus} from '../../shared/types/process-status.type';

export interface ProcessRequest {

    name: string;
    description: string;
    status: ProcessStatus;
    departmentId: number;
    startTimestamp?: string;
    finishTimestamp?: string;

}
