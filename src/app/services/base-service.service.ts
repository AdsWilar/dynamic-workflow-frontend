import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../interfaces/general-response.interface';
import {Config} from '../core/config/config';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    private BASE_PATH: string = Config.servicesBasePath;

    constructor(private http: HttpClient) {
        console.log('Servicio Base.');
    }

    public get<Response>(url: string): Observable<GeneralResponse<Response>> {
        return this.http.get<GeneralResponse<Response>>(this.BASE_PATH + url);
    }

    public post<Request, Response>(url: string, request: Request): Observable<GeneralResponse<Response>> {
        return this.http.post<GeneralResponse<Response>>(this.BASE_PATH + url, request);
    }

}
