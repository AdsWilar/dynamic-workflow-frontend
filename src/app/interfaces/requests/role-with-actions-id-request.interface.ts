import {RoleRequest} from './role-request.interface';

export interface RoleWithActionsIdRequest {

    role: RoleRequest;
    actionsId: number[];

}
