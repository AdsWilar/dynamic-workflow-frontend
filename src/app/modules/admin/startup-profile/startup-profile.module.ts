import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {NgApexchartsModule} from 'ng-apexcharts';
import {SharedModule} from 'app/shared/shared.module';
import {StartupProfileComponent} from 'app/modules/admin/startup-profile/startup-profile.component';
import {startupProfileRoutes} from 'app/modules/admin/startup-profile/startup-profile.routing';

@NgModule({
    declarations: [
        StartupProfileComponent
    ],
    imports: [
        RouterModule.forChild(startupProfileRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        NgApexchartsModule,
        SharedModule
    ]
})

export class StartupProfileModule {
}
