import {StageAnalystRequest} from './stage-analyst-request.interface';

export interface StageRequest {

    name: string;
    description: string;
    approvalsRequired: number;
    stageIndex: number;
    previousStageIndex?: number;
    nextStageIndex?: number;
    analysts: StageAnalystRequest[];

}
