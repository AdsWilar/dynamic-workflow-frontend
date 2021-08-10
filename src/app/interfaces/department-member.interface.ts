import {UserResponse} from './responses/user-response.interface';
import {DepartmentResponse} from './responses/department-response.interface';

export interface DepartmentMember {

    id: number;
    isDepartmentBoss: boolean;
    assignmentTimestamp: string;
    isActive: boolean;
    userId: number;
    departmentId: number;
    user: UserResponse;
    department: DepartmentResponse;

}
