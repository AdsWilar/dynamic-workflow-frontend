import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ListUserComponent } from './list-users/list-user.component';
import { UserComponent } from './user.component';
import { userRoutes } from './user.routing';
import {NewUserComponent} from './new-user/new-user.component';
import {SharedModule} from '../../../shared/shared.module';
import {FuseAlertModule} from '../../../../@fuse/components/alert';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations: [
        UserComponent,
        ListUserComponent,
        NewUserComponent
    ],
    imports: [
        RouterModule.forChild(userRoutes),
        MatIconModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        MatTableModule,
        MatSidenavModule,
        SharedModule,
        FuseAlertModule,
        MatDividerModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule


    ]
})

export class UserModule {
}
