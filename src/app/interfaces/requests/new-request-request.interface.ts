import {RequestInputValueRequest} from './request-input-value-request.interface';

export interface NewRequestRequest {

    processId: number;
    inputValues: RequestInputValueRequest[];

}
