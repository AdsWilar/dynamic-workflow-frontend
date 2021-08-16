import {ProcessResponse} from './process-response.interface';
import {InputDetailedResponse} from './input-detailed-response.interface';

export interface ProcessInputsResponse {

    process: ProcessResponse;
    detailedInputs: InputDetailedResponse[];

}
