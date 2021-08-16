import {RequestStatus} from '../../shared/types/request-status.type';

export interface RequestResponse {
    id: number;
    shippingTimestamp: string;
    finishTimestamp: string;
    status: RequestStatus;
    code: string;
    formPath: string;
    processId: number;
    userId: number;
}
