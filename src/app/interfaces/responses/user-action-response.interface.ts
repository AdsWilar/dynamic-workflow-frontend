import {UserResponse} from './user-response.interface';
import {Action} from '../action.interface';

export  interface UserActionResponse{
    user: UserResponse;
    actions: Action[];
}
