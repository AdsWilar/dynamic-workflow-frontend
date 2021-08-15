import {InputTypeName} from '../shared/types/input-type-name.type';
import {Restriction} from './restriction.interface';

export interface InputType {

    id: number;
    name: InputTypeName;
    description: string;
    restrictions?: Restriction[];

}
