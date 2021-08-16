import {InputResponse} from './input-response.interface';
import {InputType} from '../input-type.interface';
import {InputRestrictionResponse} from './input-restriction-response.interface';
import {SelectionInputValueResponse} from './selection-input-value-response.interface';

export interface InputDetailedResponse {

    input: InputResponse;
    inputType: InputType;
    restrictions: InputRestrictionResponse[];
    selectionInputValues: SelectionInputValueResponse[];

}
