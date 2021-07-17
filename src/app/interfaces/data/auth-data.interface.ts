import {AccessResponse} from '../responses/access-response.interface';

export interface AuthData {

    accessData: AccessResponse;
    connectionTime: Date;

}
