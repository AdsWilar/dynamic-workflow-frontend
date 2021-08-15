import {DepartmentRequest} from './department-request.interface';

export interface CompleteDepartmentRequest {

    department: DepartmentRequest;
    departmentBossId: number;
    analystMembersId: number[];

}
