import {Injectable} from '@angular/core';
import {Config} from '../core/config/config';
import {BaseService} from './base-service.service';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../interfaces/general-response.interface';
import {DepartmentMember} from '../interfaces/department-member.interface';
import {DigitalCertificateRequest} from '../interfaces/requests/digital-certificate-request.interface';
import {DigitalCertificateResponse} from '../interfaces/responses/digital-certificate-response.interface';

@Injectable({
    providedIn: 'root'
})
export class DepartmentMemberService {

    private DEPARTMENT_MEMBERS_PATH: string = Config.departmentMembersPath;

    constructor(private baseService: BaseService) {
        console.log('Servicio de Miembros de Departamentos.');
    }

    public uploadDigitalCertificate(request: DigitalCertificateRequest, departmentMemberId: number):
        Observable<GeneralResponse<DigitalCertificateResponse>> {
        return this.baseService.post<DigitalCertificateRequest, DigitalCertificateResponse>(
            this.DEPARTMENT_MEMBERS_PATH + departmentMemberId + '/digital-certificate',
            request
        );
    }

    public getAllDepartmentMembersByDepartmentId(departmentId: number):
        Observable<GeneralResponse<DepartmentMember[]>> {
        return this.baseService.get<DepartmentMember[]>(this.DEPARTMENT_MEMBERS_PATH + departmentId + '/all');
    }

}
