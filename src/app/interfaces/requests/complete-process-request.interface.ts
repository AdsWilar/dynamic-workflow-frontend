import {ProcessRequest} from './process-request.interface';
import {InputRequest} from './input-request.interface';
import {StageRequest} from './stage-request.interface';

export interface CompleteProcessRequest {

    process: ProcessRequest;
    inputs: InputRequest[];
    stages: StageRequest[];

}
