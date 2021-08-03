import {RestrictionDefinedValue} from './restriction-defined-value.interface';

export  interface Restriction {

    id: number;
    name: string;
    hasDefinedValues: boolean;
    inputTypeId: number;
    definedValues: RestrictionDefinedValue[];

}
