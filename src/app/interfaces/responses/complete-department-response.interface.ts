import {DepartmentResponse} from './department-response.interface';
import {DepartmentMember} from '../department-member.interface';

export interface CompleteDepartmentResponse {

    department: DepartmentResponse;
    departmentBoss: DepartmentMember;
    analystMembers: DepartmentMember[];

}
