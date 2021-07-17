import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FuseCardModule} from '@fuse/components/card';
import {FuseAlertModule} from '@fuse/components/alert';
import {SharedModule} from 'app/shared/shared.module';
import {RestorePasswordComponent} from 'app/modules/auth/restore-password/restore-password.component';
import {restorePasswordRoutes} from 'app/modules/auth/restore-password/restore-password.routing';

@NgModule({
    declarations: [
        RestorePasswordComponent
    ],
    imports: [
        RouterModule.forChild(restorePasswordRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule
    ]
})
export class RestorePasswordModule {
}
