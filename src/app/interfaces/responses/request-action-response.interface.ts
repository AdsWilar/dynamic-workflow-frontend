import {ExecuteAction} from '../../shared/types/execute-action.type';

export interface RequestActionResponse {

    id: number;
    executionTimestamp: string;
    executedAction: ExecuteAction;
    commentary: string;
    requestId: number;
    stageAnalystId: number;

}
