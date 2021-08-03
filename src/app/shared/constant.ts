import {DepartmentStatus} from './types/department-status.type';
import {ProcessStatus} from './types/process-status.type';

export const MainRoles: string[] = [
    'ADMINISTRATOR',
    'DEPARTMENT_BOSS',
    'ANALYST',
    'REQUESTING_USER'
];

export let DepartmentStatuses: DepartmentStatus[] = [
    'ENABLED',
    'DISABLED'
];

export const ProcessStatuses: ProcessStatus[] = [
    'ACTIVE',
    'INACTIVE'
];
