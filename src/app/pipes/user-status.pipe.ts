import {Pipe, PipeTransform} from '@angular/core';
import {UserStatus} from '../shared/types/user-status.type';

@Pipe({name: 'userStatus'})
export class UserStatusPipe implements PipeTransform {

    transform(userStatus: UserStatus): string {
        switch (userStatus) {
            case 'ENABLED':
                return 'HABILITADO';
            case 'DISABLED':
                return 'DESHABILITADO';
            case 'RESTORE_PASSWORD':
                return 'RESTAURAR CONTRASEÑA';
        }
    }

}
