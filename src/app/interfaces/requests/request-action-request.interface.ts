import {ExecutedAction} from '../../shared/types/executed-action.type';

export interface RequestActionRequest {

    executedAction: ExecutedAction;
    commentary: string;
    digitalCertificatePassword?: string;
}
