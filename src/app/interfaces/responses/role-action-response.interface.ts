import {RoleResponse} from './role-response.interface';
import {Action} from '../action.interface';

export interface RoleActionResponse {

    role: RoleResponse;
    actions: Action[];

}
