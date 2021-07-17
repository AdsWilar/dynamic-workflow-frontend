import {Action} from '../action.interface';

export interface AccessResponse {

    userId: number;
    username: string;
    userStatus: string;
    userFullName: string;
    userEmail: string;
    userPhoneNumber: string;
    userCode: string;
    token: string;
    userActions: Action[];

}
