import {TriggerSequenceRequest} from './trigger-sequence-request.interface';

export interface SelectionInputValueRequest {

    value: string;
    triggerSequences?: TriggerSequenceRequest[];

}
