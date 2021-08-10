import {InputRestrictionRequest} from './input-restriction-request.interface';
import {SelectionInputValueRequest} from './selection-input-value-request.interface';

export interface InputRequest {

    name: string;
    description: string;
    isMandatory: boolean;
    inputTypeId: number;
    restrictions?: InputRestrictionRequest[];
    selectionValues?: SelectionInputValueRequest[];

}
