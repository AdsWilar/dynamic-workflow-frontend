import {Route} from '@angular/router';
import {DepartmentComponent} from './department.component';
import {ViewDepartmentComponent} from './view-department/view-department.component';


export const departmentRoutes: Route[] = [
    {
        path: '',
        component: DepartmentComponent
    },
    {
        path: 'view/:id',
        component: ViewDepartmentComponent
    }

];
