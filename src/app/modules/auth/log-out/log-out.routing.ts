import { Route } from '@angular/router';
import { LogOutComponent } from 'app/modules/auth/log-out/log-out.component';

export const logOutRoutes: Route[] = [
    {
        path     : '',
        component: LogOutComponent
    }
];
