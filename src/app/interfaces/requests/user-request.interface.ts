import {UserStatus} from '../../shared/types/user-status.type';

export interface UserRequest {

    username: string;
    password?: string;
    passwordConfirmation?: string;
    status?: UserStatus;
    names: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    phone: string;
    identificationNumber: number;
    code?: string;

}
