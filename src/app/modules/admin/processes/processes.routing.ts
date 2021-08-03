import {Route} from '@angular/router';
import {ProcessesComponent} from './processes.component';
import {NewProcessesComponent} from './new-processes/new-processes.component';

export const processesRoutes: Route[] = [
    {
        path: '',
        component: ProcessesComponent
    },
    {
        path: 'new',
        component: NewProcessesComponent
    }

];
