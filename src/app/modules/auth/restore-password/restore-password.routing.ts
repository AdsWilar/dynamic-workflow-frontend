import { Route } from '@angular/router';
import { RestorePasswordComponent } from 'app/modules/auth/restore-password/restore-password.component';

export const restorePasswordRoutes: Route[] = [
    {
        path     : '',
        component: RestorePasswordComponent
    }
];
