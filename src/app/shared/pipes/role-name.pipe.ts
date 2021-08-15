import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'roleName'})
export class RoleNamePipe implements PipeTransform {

    transform(roleName: string): string {
        switch (roleName) {
            case 'ADMINISTRATOR':
                return 'ADMINISTRADOR';
            case 'DEPARTMENT_BOSS':
                return 'JEFE DE DEPARTAMENTO';
            case 'ANALYST':
                return 'ANALISTA';
            case 'REQUESTING_USER':
                return 'USUARIO SOLICITANTE';
            default:
                return roleName;
        }
    }

}
