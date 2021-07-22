import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ListRoleComponent } from './list-roles/list-role.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { RoleComponent } from './role.component';
import { roleRoutes } from './role.routing';
import {FuseAlertModule} from '../../../../@fuse/components/alert';
import {ViewRoleActionComponent} from './view-role-actions/view-role-actions.component';
import {EditRoleComponent} from './edit-role/edit-role.component';

@NgModule({
    declarations: [
        RoleComponent,
        ListRoleComponent,
        NewRoleComponent,
        ViewRoleActionComponent,
        EditRoleComponent

    ],
    imports: [
        RouterModule.forChild(roleRoutes),
        MatIconModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        MatTableModule,
        MatSidenavModule,
        SharedModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatCheckboxModule,
        FuseAlertModule


    ]
})

export class RoleModule {
}
