import {UserRequest} from './user-request.interface';

export interface CompleteUserRequest {
    user: UserRequest;
    actionsId: number[];
}
