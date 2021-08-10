import {ProcessResponse} from './process-response.interface';
import {UserResponse} from './user-response.interface';
import {DepartmentResponse} from './department-response.interface';

export interface ProcessDetailResponse {

    process: ProcessResponse;
    user: UserResponse;
    department: DepartmentResponse;

}
