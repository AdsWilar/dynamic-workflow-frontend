import {Injectable} from '@angular/core';
import {Config} from '../core/config/config';
import {BaseService} from './base-service.service';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../interfaces/general-response.interface';
import {RequestResponse} from '../interfaces/responses/request-response.interface';
import {RequestActionRequest} from '../interfaces/requests/request-action-request.interface';
import {RequestActionResponse} from '../interfaces/responses/request-action-response.interface';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    private REQUESTS_PATH: string = Config.requestsPath;

    constructor(private baseService: BaseService) {
        console.log('Servicio de solicitudes.');
    }

    public getAllRequestsForCurrentUser(): Observable<GeneralResponse<RequestResponse[]>> {
        return this.baseService.get<RequestResponse[]>(
            this.REQUESTS_PATH + 'all/current-user');
    }

    public getPendingRequestsForCurrentAnalyst(): Observable<GeneralResponse<RequestResponse[]>> {
        return this.baseService.get<RequestResponse[]>(
            this.REQUESTS_PATH + 'pending/current-analyst');
    }

    public executeActionOnRequest(request: RequestActionRequest, requestId: number): Observable<GeneralResponse<RequestActionResponse>> {
        return this.baseService.post<RequestActionRequest, RequestActionResponse>(
            this.REQUESTS_PATH + requestId + '/execute-action', request);
    }


}