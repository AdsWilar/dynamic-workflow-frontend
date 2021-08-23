import {ExecutedAction} from '../../shared/types/executed-action.type';

export interface RequestActionResponse {

    id: number;
    executionTimestamp: string;
    executedAction: ExecutedAction;
    commentary: string;
    requestId: number;
    stageAnalystId: number;

}
