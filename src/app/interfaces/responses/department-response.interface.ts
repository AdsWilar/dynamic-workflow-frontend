import {DepartmentStatus} from '../../shared/types/department-status.type';

export interface DepartmentResponse {

    id: number;
    name: string;
    contactEmail: string;
    contactPhone: string;
    location: string;
    creationTimestamp: string;
    modificationTimestamp: string;
    status: DepartmentStatus;
    parentDepartmentId: number;
    parentDepartment: DepartmentResponse;
    subordinateDepartments: DepartmentResponse[];

}
