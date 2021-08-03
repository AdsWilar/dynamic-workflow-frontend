import {Injectable} from '@angular/core';
import {BaseService} from './base-service.service';
import {RoleResponse} from '../interfaces/responses/role-response.interface';
import {GeneralResponse} from '../interfaces/general-response.interface';
import {Observable} from 'rxjs';
import {Config} from '../core/config/config';
import {CompleteRoleRequest} from '../interfaces/requests/complete-role-request.interface';
import {RoleActionResponse} from '../interfaces/responses/role-action-response.interface';
import {UpdateRoleActionsRequest} from '../interfaces/requests/update-role-actions-request.interface';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private ROLES_PATH: string = Config.rolesPath;

    constructor(private baseService: BaseService) {
        console.log('Servicio de Roles.');
    }

    public registerRole(request: CompleteRoleRequest): Observable<GeneralResponse<RoleActionResponse>> {
        return this.baseService.post<CompleteRoleRequest, RoleActionResponse>(this.ROLES_PATH, request);
    }

    public updateRole(request: CompleteRoleRequest, id: number): Observable<GeneralResponse<RoleActionResponse>> {
        return this.baseService.post<CompleteRoleRequest, RoleActionResponse>(this.ROLES_PATH + id, request);
    }

    public updateRoleActions(request: UpdateRoleActionsRequest,
                             id: number): Observable<GeneralResponse<RoleActionResponse>> {
        return this.baseService.post<UpdateRoleActionsRequest, RoleActionResponse>(
            this.ROLES_PATH + id + '/actions',
            request
        );
    }

    public getRoleById(id: number): Observable<GeneralResponse<RoleResponse>> {
        return this.baseService.get<RoleResponse>(this.ROLES_PATH + id);
    }

    public getAllRoles(): Observable<GeneralResponse<RoleResponse[]>> {
        return this.baseService.get<RoleResponse[]>(this.ROLES_PATH + 'all');
    }

    public getRoleActionsByRoleId(roleId: number): Observable<GeneralResponse<RoleActionResponse>> {
        return this.baseService.get<RoleActionResponse>(this.ROLES_PATH + roleId + '/actions');
    }

}
