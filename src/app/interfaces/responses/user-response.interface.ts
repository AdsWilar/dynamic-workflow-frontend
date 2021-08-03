import {UserStatus} from '../../shared/types/user-status.type';

export interface UserResponse {

    id: number;
    username: string;
    status: UserStatus;
    creationTimestamp: Date;
    modificationTimestamp: Date;
    names: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    phone: string;
    identificationNumber: number;
    code: string;

}
