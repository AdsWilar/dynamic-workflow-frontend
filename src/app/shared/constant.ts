import {DepartmentStatus} from './types/department-status.type';
import {ProcessStatus} from './types/process-status.type';
import {InputTypeName} from './types/input-type-name.type';

export const MainRoles: string[] = [
    'ADMINISTRATOR',
    'DEPARTMENT_BOSS',
    'ANALYST',
    'REQUESTING_USER'
];

export const DepartmentStatuses: DepartmentStatus[] = [
    'ENABLED',
    'DISABLED'
];

export const ProcessStatuses: ProcessStatus[] = [
    'ACTIVE',
    'INACTIVE'
];

export const InputTypesWithOptionValues: InputTypeName[] = [
    'MULTIPLE_CHOICE',
    'SELECTION_BOX',
    'DEPLOYABLE_LIST'
];
