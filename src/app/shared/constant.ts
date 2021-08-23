import {DepartmentStatus} from './types/department-status.type';
import {ProcessStatus} from './types/process-status.type';
import {InputTypeName} from './types/input-type-name.type';
import {FuseNavigationItem} from '../../@fuse/components/navigation';

export const StartupProfileItem: FuseNavigationItem = {
    id: 'startup-profile',
    title: 'Perfil',
    type: 'basic',
    icon: 'mat_solid:person',
    link: '/startup-profile'
};

export const RolesItem: FuseNavigationItem = {
    id: 'roles',
    title: 'Roles',
    type: 'basic',
    icon: 'heroicons_outline:document-text',
    link: '/roles'
};

export const UsersItem: FuseNavigationItem = {
    id: 'users',
    title: 'Usuarios',
    type: 'basic',
    icon: 'mat_solid:people_alt',
    link: '/users'
};

export const DepartmentsItem: FuseNavigationItem = {
    id: 'departments',
    title: 'Departamentos',
    type: 'basic',
    icon: 'heroicons_outline:office-building',
    link: '/departments'
};

export const ProcessesItem: FuseNavigationItem = {
    id: 'processes',
    title: 'Procesos',
    type: 'basic',
    icon: 'work_outline',
    link: '/processes'
};

export const RequestsItem: FuseNavigationItem = {
    id: 'requests',
    title: 'Solicitudes',
    type: 'collapsable',
    icon: 'heroicons_outline:pencil-alt'
};

export const NewRequestItem: FuseNavigationItem = {
    id: 'new-request',
    title: 'Nueva Solicitud',
    type: 'basic',
    link: '/requests/new-request/root'
};

export const MyRequestsItem: FuseNavigationItem = {
    id: 'my-requests',
    title: 'Mis Solicitudes',
    type: 'basic',
    link: '/requests/my-requests'
};

export const SalverRequestsItem: FuseNavigationItem = {
    id: 'request-tray',
    title: 'Bandeja',
    type: 'basic',
    link: '/requests/request-tray'
};

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
