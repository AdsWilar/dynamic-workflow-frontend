import {Injectable} from '@angular/core';
import {Config} from '../core/config/config';
import {BaseService} from './base-service.service';
import {CompleteDepartmentRequest} from '../interfaces/requests/complete-department-request.interface';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../interfaces/general-response.interface';
import {CompleteDepartmentResponse} from '../interfaces/responses/complete-department-response.interface';
import {DepartmentRequest} from '../interfaces/requests/department-request.interface';
import {DepartmentResponse} from '../interfaces/responses/department-response.interface';
import {UpdateDepartmentMembersRequest} from '../interfaces/requests/update-department-members-request.interface';
import {DepartmentMember} from '../interfaces/department-member.interface';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    private DEPARTMENTS_PATH: string = Config.departmentsPath;

    constructor(private baseService: BaseService) {
        console.log('Servicio de Departamentos.');
    }

    public registerCompleteDepartment(request: CompleteDepartmentRequest):
        Observable<GeneralResponse<CompleteDepartmentResponse>> {
        return this.baseService.post<CompleteDepartmentRequest, CompleteDepartmentResponse>(
            this.DEPARTMENTS_PATH + 'complete',
            request
        );
    }

    public updateDepartment(request: DepartmentRequest, id: number): Observable<GeneralResponse<DepartmentResponse>> {
        return this.baseService.post<DepartmentRequest, DepartmentResponse>(this.DEPARTMENTS_PATH + id, request);
    }

    public updateDepartmentMembers(request: UpdateDepartmentMembersRequest, id: number):
        Observable<GeneralResponse<CompleteDepartmentResponse>> {
        return this.baseService.post<UpdateDepartmentMembersRequest, CompleteDepartmentResponse>(
            this.DEPARTMENTS_PATH + id + '/members',
            request
        );
    }

    public getCompleteDepartmentById(id: number): Observable<GeneralResponse<CompleteDepartmentResponse>> {
        return this.baseService.get<CompleteDepartmentResponse>(this.DEPARTMENTS_PATH + id + '/complete');
    }

    public getAllDepartmentsForCurrentUser(): Observable<GeneralResponse<DepartmentResponse[]>> {
        return this.baseService.get<DepartmentResponse[]>(this.DEPARTMENTS_PATH + 'current-user/all');
    }


    public getDepartmentWithDescendantsById(id: number): Observable<GeneralResponse<DepartmentResponse[]>> {
        return this.baseService.get<DepartmentResponse[]>(this.DEPARTMENTS_PATH + id + '/with-descendants');
    }

    public getRootDepartment(): Observable<GeneralResponse<DepartmentResponse>> {
        return this.baseService.get<DepartmentResponse>(this.DEPARTMENTS_PATH + 'root');
    }

}
