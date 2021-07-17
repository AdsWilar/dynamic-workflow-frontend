import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {FuseCardModule} from '@fuse/components/card';
import {SharedModule} from 'app/shared/shared.module';
import {LogOutComponent} from 'app/modules/auth/log-out/log-out.component';
import {logOutRoutes} from 'app/modules/auth/log-out/log-out.routing';

@NgModule({
    declarations: [
        LogOutComponent
    ],
    imports: [
        RouterModule.forChild(logOutRoutes),
        MatButtonModule,
        FuseCardModule,
        SharedModule
    ]
})
export class LogOutModule {
}
