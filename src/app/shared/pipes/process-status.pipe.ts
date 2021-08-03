import {Pipe, PipeTransform} from '@angular/core';
import {ProcessStatus} from '../types/process-status.type';

@Pipe({name: 'processStatus'})
export class ProcessStatusPipe implements PipeTransform {

    transform(processStatus: ProcessStatus): string {
        switch (processStatus) {
            case 'ACTIVE':
                return 'ACTIVO';
            case 'INACTIVE':
                return 'INACTIVO';
        }
    }

}
