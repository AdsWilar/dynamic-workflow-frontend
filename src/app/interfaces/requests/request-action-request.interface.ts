import {ExecuteAction} from '../../shared/types/execute-action.type';

export interface RequestActionRequest {

    executedAction: ExecuteAction;
    commentary: string;
    digitalCertificatePassword: string;
}
