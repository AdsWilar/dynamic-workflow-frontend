import {Route} from '@angular/router';
import {ProcessComponent} from './process.component';
import {NewProcessComponent} from './new-process/new-process.component';

export const processRoutes: Route[] = [
    {
        path: '',
        component: ProcessComponent
    },
    {
        path: 'new',
        component: NewProcessComponent
    }
];
