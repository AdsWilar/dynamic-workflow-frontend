import {Injectable} from '@angular/core';
import {Config} from '../core/config/config';
import {BaseService} from './base-service.service';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../interfaces/general-response.interface';
import {AccessResponse} from '../interfaces/responses/access-response.interface';
import {AccessRequest} from '../interfaces/requests/access-request.interface';
import {RestorePasswordRequest} from '../interfaces/requests/restore-password-request.interface';
import {UpdatePasswordRequest} from '../interfaces/requests/update-password-request.interface';

@Injectable({
    providedIn: 'root'
})
export class AccessService {

    private ACCESS_PATH: string = Config.accessPath;

    constructor(private baseService: BaseService) {
        console.log('Servicio de Acceso.');
    }

    public logIn(request: AccessRequest): Observable<GeneralResponse<AccessResponse>> {
        return this.baseService.post<AccessRequest, AccessResponse>(this.ACCESS_PATH + 'log-in', request);
    }

    public restorePassword(request: RestorePasswordRequest): Observable<GeneralResponse<any>> {
        return this.baseService.post<RestorePasswordRequest, any>(this.ACCESS_PATH + 'password/restore', request);
    }

    public updatePassword(request: UpdatePasswordRequest): Observable<GeneralResponse<any>> {
        return this.baseService.post<UpdatePasswordRequest, any>(this.ACCESS_PATH + 'password/update', request);
    }

}
