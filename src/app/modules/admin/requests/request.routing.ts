import {Route} from '@angular/router';
import {MyRequestComponent} from './my-requests/my-request.component';
import {NewRequestComponent} from './new-request/new-request.component';
import {ViewProcessesComponent} from './new-request/view-processes/view-processes.component';
import {NewProcessRequestComponent} from './new-request/new-process-request/new-process-request.component';
import {SalverRequestComponent} from './salver-request/salver-request.component';

export const requestRouting: Route[] = [

    {
        path: '',
        pathMatch: 'full',

    },
    {
        path: 'new-request/root',
        component: NewRequestComponent,
        data: {
            isRoot: true
        }
    },
    {
        path: 'new-request/:departmentId',
        component: NewRequestComponent,
        data: {
            isRoot: false
        }
    },
    {
        path: 'new-processes-request/:processId/:departmentId',
        component: NewProcessRequestComponent,

    },

    {
        path: 'view-process-request/:departmentId',
        component: ViewProcessesComponent
    },
    {
        path: 'my-requests',
        component: MyRequestComponent,
    },
    {
        path: 'salver-requests',
        component: SalverRequestComponent,
    }
];
