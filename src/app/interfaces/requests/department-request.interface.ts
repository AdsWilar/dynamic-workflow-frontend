import {DepartmentStatus} from '../../shared/types/department-status.type';

export interface DepartmentRequest {

    name: string;
    contactEmail: string;
    contactPhone: string;
    location: string;
    status: DepartmentStatus;
    parentDepartmentId: number;

}
