import {Pipe, PipeTransform} from '@angular/core';
import {UserData} from '../interfaces/data/user-data.interface';

@Pipe({name: 'userFullName'})
export class UserFullNamePipe implements PipeTransform {

    transform(userData: UserData): string {
        let fullName = '';
        if (userData !== undefined && userData !== null) {
            fullName = userData.names + ' ' + userData.firstSurname;
            const secondSurname = userData.secondSurname;
            if (secondSurname != null) {
                fullName += ' ' + secondSurname;
            }
        }
        return fullName;
    }

}
