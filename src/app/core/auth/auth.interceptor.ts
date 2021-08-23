import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthManager} from 'app/core/auth/auth-manager';
import {LoadingService} from '../../services/loading-service.service';
import {finalize} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authManager: AuthManager, private loadingService: LoadingService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.show();
        if (this.authManager.isAuthenticated()) {
            const token = this.authManager.getCurrentAuthData().accessData.token;
            req = req.clone({
                setHeaders: {Authorization: `Bearer ${token}`}
            });
        }
        console.log(req);
        return next.handle(req).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

}
