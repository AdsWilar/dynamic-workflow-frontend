import { Injectable } from "@angular/core";
import { Config } from "app/core/config/config";
import { Action } from "app/interfaces/action.interface";
import { GeneralResponse } from "app/interfaces/general-response.interface";
import { Observable } from "rxjs";
import { BaseService } from "./base-service.service";

@Injectable({
    providedIn: 'root'
})
export class ActionService {

    private ACTIONS_PATH: string = Config.actionsPath;

    constructor(private baseService: BaseService) {
        console.log('Servicio de Acciones.');
    }

    public getAllActions():Observable<GeneralResponse<Action[]>>{
        return this.baseService.get<Action[]>(this.ACTIONS_PATH + 'all');
    }

}
