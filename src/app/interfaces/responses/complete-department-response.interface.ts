import {DepartmentResponse} from './department-response.interface';
import {UserResponse} from './user-response.interface';

export interface CompleteDepartmentResponse {

    department: DepartmentResponse;
    departmentBoss: UserResponse;
    analystMembers: UserResponse[];

}
