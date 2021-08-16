import {Pipe, PipeTransform} from '@angular/core';
import {RequestStatus} from '../types/request-status.type';

@Pipe({name: 'requestStatus'})

export class RequestStatusPipe implements PipeTransform {

    transform(requestStatus: RequestStatus): string {
        switch (requestStatus) {
            case 'IN_PROCESS' :
                return 'EN PROCESO';
            case 'APPROVED':
                return 'APROBADO';
            case 'REJECTED':
                return 'RECHAZADO';
        }
    }

}
