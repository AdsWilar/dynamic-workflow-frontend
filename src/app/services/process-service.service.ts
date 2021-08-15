import {Injectable} from '@angular/core';
import {Config} from '../core/config/config';
import {BaseService} from './base-service.service';
import {CompleteProcessRequest} from '../interfaces/requests/complete-process-request.interface';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../interfaces/general-response.interface';
import {CompleteProcessResponse} from '../interfaces/responses/complete-process-response.interface';
import {ProcessDetailResponse} from '../interfaces/responses/process-detail-response.interface';

@Injectable({
    providedIn: 'root'
})
export class ProcessService {

    private PROCESSES_PATH = Config.processesPath;

    constructor(private baseService: BaseService) {
        console.log('Servicio de Procesos.');
    }

    public createProcess(request: CompleteProcessRequest): Observable<GeneralResponse<CompleteProcessResponse>> {
        return this.baseService.post<CompleteProcessRequest, CompleteProcessResponse>(
            this.PROCESSES_PATH + 'complete',
            request
        );
    }

    public getAllDetailedProcesses(): Observable<GeneralResponse<ProcessDetailResponse[]>> {
        return this.baseService.get<ProcessDetailResponse[]>(this.PROCESSES_PATH + 'all');
    }

}
