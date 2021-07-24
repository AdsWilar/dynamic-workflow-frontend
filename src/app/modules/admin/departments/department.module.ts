import {NgModule} from '@angular/core';
import {DepartmentComponent} from './department.component';
import {RouterModule} from '@angular/router';
import {departmentRoutes} from './department.routing';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ListDepartmentComponent} from './list-department/list-department.component';
import {MatTableModule} from '@angular/material/table';
import {NewDepartmentComponent} from './new-department/new-department.component';
import {MatDividerModule} from '@angular/material/divider';
import {FuseAlertModule} from '../../../../@fuse/components/alert';
import {SharedModule} from '../../../shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
    declarations: [
        DepartmentComponent,
        ListDepartmentComponent,
        NewDepartmentComponent
    ],
    imports: [
        RouterModule.forChild(departmentRoutes),
        MatSidenavModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatDividerModule,
        FuseAlertModule,
        SharedModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatCheckboxModule
    ]
})

export class DepartmentModule {
}
