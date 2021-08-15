import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {FuseAlertModule} from '../../../../@fuse/components/alert';
import {SharedModule} from '../../../shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ProcessComponent} from './process.component';
import {processRoutes} from './process.routing';
import {NewProcessComponent} from './new-process/new-process.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {FuseCardModule} from '../../../../@fuse/components/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatTreeModule} from '@angular/material/tree';
import {MatCardModule} from '@angular/material/card';
import {DynamicInputComponent} from './new-process/dynamic-input/dynamic-input.component';
import {NewOptionComponent} from './new-process/dynamic-input/option/new-option.component';
import {EditOptionComponent} from './new-process/dynamic-input/option/edit-option.component';
import {StageComponent} from './new-process/stage/stage.component';
import {ProcessListComponent} from './process-list/process-list.component';

@NgModule({
    declarations: [
        ProcessComponent,
        ProcessListComponent,
        NewProcessComponent,
        DynamicInputComponent,
        NewOptionComponent,
        EditOptionComponent,
        StageComponent
    ],
    imports: [
        RouterModule.forChild(processRoutes),
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
        MatCheckboxModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatStepperModule,
        MatRadioModule,
        FuseCardModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        MatTreeModule,
        MatCardModule
    ]
})

export class ProcessModule {
}
