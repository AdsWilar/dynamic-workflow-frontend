import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthManager} from 'app/core/auth/auth-manager';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authManager: AuthManager) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authManager.isAuthenticated()) {
            const token = this.authManager.getCurrentAuthData().accessData.token;
            req = req.clone({
                setHeaders: {Authorization: `Bearer ${token}`}
            });
        }
        console.log(req);
        return next.handle(req);
    }

}
