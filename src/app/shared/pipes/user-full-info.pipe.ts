import {Pipe, PipeTransform} from '@angular/core';
import {UserResponse} from '../../interfaces/responses/user-response.interface';

@Pipe({name: 'userFullInfo'})
export class UserFullInfoPipe implements PipeTransform {

    transform(user: UserResponse): string {
        let fullInfo: string = '';
        if (user !== undefined && user !== null) {
            let fullName: string = user.names + ' ' + user.firstSurname;
            const secondSurname = user.secondSurname;
            if (secondSurname != null) {
                fullName += ' ' + secondSurname;
            }
            fullInfo = fullName + ' [' + user.username + ']';
        }
        return fullInfo;
    }

}
