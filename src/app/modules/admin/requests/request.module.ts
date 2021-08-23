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
import {FormInputComponent} from './new-request/new-process-request/form-input/form-input.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTreeModule} from '@angular/material/tree';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {RequestTrayComponent} from './request-tray/request-tray.component';
import {RequestInboxComponent} from './request-tray/request-inbox/request-inbox.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ListMyRequestComponent} from './my-requests/list-my-request/list-my-request.component';
import {FinishedRequestListComponent} from './request-tray/request-inbox/finished-request-list/finished-request-list.component';
import {PendingRequestListComponent} from './request-tray/request-inbox/pending-request-list/pending-request-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {FuseAlertModule} from '../../../../@fuse/components/alert';
import {MatRadioModule} from '@angular/material/radio';
import {ViewRequestDetailComponent} from './request-tray/request-inbox/pending-request-list/view-request-detail/view-request-detail.component';
import {RequestDetailComponent} from './request-tray/request-inbox/pending-request-list/view-request-detail/request-detail/request-detail.component';
import {RequestActionComponent} from './request-tray/request-inbox/pending-request-list/view-request-detail/request-detail/request-action/request-action.component';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
    declarations: [
        MyRequestComponent,
        NewRequestComponent,
        DepartmentListComponent,
        ViewProcessesComponent,
        DepartmentProcessListComponent,
        NewProcessRequestComponent,
        RequestTrayComponent,
        FormInputComponent,
        RequestInboxComponent,
        ListMyRequestComponent,
        FinishedRequestListComponent,
        PendingRequestListComponent,
        ViewRequestDetailComponent,
        RequestDetailComponent,
        RequestActionComponent
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
        FuseAlertModule,
        MatRadioModule,
        MatNativeDateModule
    ],
})

export class RequestModule {
}
