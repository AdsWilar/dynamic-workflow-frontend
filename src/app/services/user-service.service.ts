import {Injectable} from '@angular/core';
import {Config} from '../core/config/config';
import {BaseService} from './base-service.service';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../interfaces/general-response.interface';
import {UserResponse} from '../interfaces/responses/user-response.interface';
import {UserRequest} from '../interfaces/requests/user-request.interface';

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

    public getCurrentUser(): Observable<GeneralResponse<UserResponse>> {
        return this.baseService.get<UserResponse>(this.USERS_PATH + 'current');
    }

    public getAllUsers(): Observable<GeneralResponse<UserResponse[]>> {
        return this.baseService.get<UserResponse[]>(this.USERS_PATH + 'all');
    }

}
