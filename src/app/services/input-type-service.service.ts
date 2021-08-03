import {Injectable} from '@angular/core';
import {Config} from '../core/config/config';
import {BaseService} from './base-service.service';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../interfaces/general-response.interface';
import {InputType} from '../interfaces/input-type.interface';

@Injectable({
    providedIn: 'root'
})
export class InputTypeService {

    private INPUT_TYPES_PATH: string = Config.inputTypesPath;

    constructor(private baseService: BaseService) {
        console.log('Servicio de Acciones.');
    }

    public getAllInputTypes(): Observable<GeneralResponse<InputType[]>> {
        return this.baseService.get<InputType[]>(this.INPUT_TYPES_PATH + 'all');
    }

}
