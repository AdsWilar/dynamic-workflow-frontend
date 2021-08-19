import {Injectable} from '@angular/core';
import {Config} from '../core/config/config';
import {BaseService} from './base-service.service';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../interfaces/general-response.interface';
import {UserResponse} from '../interfaces/responses/user-response.interface';
import {UserRequest} from '../interfaces/requests/user-request.interface';
import {CompleteUserRequest} from '../interfaces/requests/complete-user-request.interface';
import {UserActionResponse} from '../interfaces/responses/user-action-response.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private USERS_PATH: string = Config.usersPath;

    constructor(private baseService: BaseService) {
        console.log('Servicio de Usuarios.');
    }

    public registerRequestingUser(request: UserRequest): Observable<GeneralResponse<UserResponse>> {
        return this.baseService.post<UserRequest, UserResponse>(this.USERS_PATH + 'requesting', request);
    }

    public registerUser(request: CompleteUserRequest): Observable<GeneralResponse<UserActionResponse>> {
        return this.baseService.post<CompleteUserRequest, UserActionResponse>(this.USERS_PATH, request);
    }

    public updateUser(userId: number, request: CompleteUserRequest): Observable<GeneralResponse<UserActionResponse>> {
        return this.baseService.post<CompleteUserRequest, UserActionResponse>(this.USERS_PATH + userId, request);
    }

    public getCurrentUser(): Observable<GeneralResponse<UserResponse>> {
        return this.baseService.get<UserResponse>(this.USERS_PATH + 'current');
    }

    public getAllUsers(): Observable<GeneralResponse<UserResponse[]>> {
        return this.baseService.get<UserResponse[]>(this.USERS_PATH + 'all');
    }

    public getUserActionByUserId(userId: number): Observable<GeneralResponse<UserActionResponse>> {
        return this.baseService.get<UserActionResponse>(this.USERS_PATH + userId + '/actions');
    }

    public getNonDepartmentBosses(): Observable<GeneralResponse<UserResponse[]>> {
        return this.baseService.get<UserResponse[]>(this.USERS_PATH + 'non-department-bosses');
    }

    public getNonDepartmentMembers(): Observable<GeneralResponse<UserResponse[]>> {
        return this.baseService.get<UserResponse[]>(this.USERS_PATH + 'non-department-members');
    }

}
