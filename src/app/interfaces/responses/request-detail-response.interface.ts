import {RequestResponse} from './request-response.interface';
import {ProcessResponse} from './process-response.interface';
import {UserResponse} from './user-response.interface';

export interface RequestDetailResponse {

    request: RequestResponse;
    process: ProcessResponse;
    user: UserResponse;

}
