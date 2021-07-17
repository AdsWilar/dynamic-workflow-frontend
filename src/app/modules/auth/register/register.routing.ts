import { Route } from '@angular/router';
import { RegisterComponent } from 'app/modules/auth/register/register.component';

export const registerRoutes: Route[] = [
    {
        path     : '',
        component: RegisterComponent
    }
];
