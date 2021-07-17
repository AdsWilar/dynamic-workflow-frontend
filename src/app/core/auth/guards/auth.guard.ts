import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthManager} from 'app/core/auth/auth-manager';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private authManager: AuthManager, private router: Router) {
    }

    private check(redirectURL: string): boolean {
        if (!this.authManager.isAuthenticated()) {
            this.router.navigate(['log-in'], {queryParams: {redirectURL}});

            return false;
        }
        return true;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> |
        boolean {
        const redirectUrl = state.url === '/log-out' ? '/' : state.url;
        return this.check(redirectUrl);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> | boolean | UrlTree {
        const redirectUrl = state.url === '/log-out' ? '/' : state.url;
        return this.check(redirectUrl);
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.check('/');
    }

}
