import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {requestRouting} from './request.routing';
import {MatExpansionModule} from '@angular/material/expansion';
import {MyRequestComponent} from './my-requests/my-request.component';
import {NewRequestComponent} from './new-request/new-request.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {DepartmentListComponent} from './new-request/department-list/department-list.component';
import {MatButtonModule} from '@angular/material/button';
import {FuseCardModule} from '../../../../@fuse/components/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {ViewProcessesComponent} from './new-request/view-processes/view-processes.component';
import {DepartmentProcessListComponent} from './new-request/department-process-list/department-process-list.component';
import {NewProcessRequestComponent} from './new-request/new-process-request/new-process-request.component';
import {InputDynamicComponent} from './new-request/new-process-request/input-dynamic/input-dynamic.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTreeModule} from '@angular/material/tree';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [
        MyRequestComponent,
        NewRequestComponent,
        DepartmentListComponent,
        ViewProcessesComponent,
        DepartmentProcessListComponent,
        NewProcessRequestComponent,
        InputDynamicComponent


    ],
    imports: [
        RouterModule.forChild(requestRouting),
        SharedModule,
        MatExpansionModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        FuseCardModule,
        MatMenuModule,
        MatCardModule,
        MatFormFieldModule,
        MatTableModule,
        MatSelectModule,
        MatTreeModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatInputModule
    ],
})

export class RequestModule {
}
