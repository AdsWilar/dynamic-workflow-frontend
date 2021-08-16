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
import {RequestTrayComponent} from './salver-request/request-tray.component';
import {TapSalverRequestComponent} from './salver-request/tap-salver-request/tap-salver-request.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ListMyRequestComponent} from './my-requests/list-my-request/list-my-request.component';
import {FinishedListComponent} from './salver-request/tap-salver-request/finished-list/finished-list.component';
import {SlopesListComponent} from './salver-request/tap-salver-request/slopes-list/slopes-list.component';
import {ViewRequestDetailComponent} from './salver-request/tap-salver-request/slopes-list/view-request-detail/view-request-detail.component';
import {DetailComponent} from './salver-request/tap-salver-request/slopes-list/view-request-detail/detail/detail.component';
import {ApproveRequestDialogComponent} from './salver-request/tap-salver-request/slopes-list/view-request-detail/detail/approve-request-dialog/approve-request-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {FuseAlertModule} from '../../../../@fuse/components/alert';

@NgModule({
    declarations: [
        MyRequestComponent,
        NewRequestComponent,
        DepartmentListComponent,
        ViewProcessesComponent,
        DepartmentProcessListComponent,
        NewProcessRequestComponent,
        InputDynamicComponent,
        RequestTrayComponent,
        TapSalverRequestComponent,
        ListMyRequestComponent,
        FinishedListComponent,
        SlopesListComponent,
        ViewRequestDetailComponent,
        DetailComponent,
        ApproveRequestDialogComponent


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
        MatInputModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatDividerModule,
        FuseAlertModule
    ],
})

export class RequestModule {
}
