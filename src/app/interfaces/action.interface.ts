import {ActionCode} from '../shared/types/action-code.type';

export interface Action {

    id: number;
    code: ActionCode;
    description: string;

}
