import {Pipe, PipeTransform} from '@angular/core';
import {InputTypeName} from '../types/input-type-name.type';


@Pipe({name: 'inputTypeName'})
export class InputTypeNamePipe implements PipeTransform {
    transform(inputTypeName: InputTypeName): string {
        switch (inputTypeName) {
            case 'TEXT':
                return 'Texto';
            case 'MULTIPLE_CHOICE':
                return 'Opcion múltiple';
            case 'SELECTION_BOX':
                return 'Casilla de selección';
            case 'DEPLOYABLE_LIST':
                return 'Lista desplegable';
            case 'UPLOAD_FILE':
                return 'Subir Archivo';
            case 'DATE':
                return 'Fecha';

        }
    }

}
