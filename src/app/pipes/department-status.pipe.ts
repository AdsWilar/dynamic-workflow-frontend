import {Pipe, PipeTransform} from '@angular/core';
import {DepartmentStatus} from '../shared/types/department-status.type';

@Pipe({name: 'departmentStatus'})
export class DepartmentStatusPipe implements PipeTransform {

    transform(departmentStatus: DepartmentStatus): string {
        switch (departmentStatus) {
            case 'ENABLED':
                return 'HABILITADO';
            case 'DISABLED':
                return 'DESHABILITADO';
        }
    }

}
