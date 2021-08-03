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
import {ProcessesComponent} from './processes.component';
import {processesRoutes} from './processes.routing';
import {NewProcessesComponent} from './new-processes/new-processes.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {FuseCardModule} from '../../../../@fuse/components/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatTreeModule} from '@angular/material/tree';
import {StageFormComponent} from './new-processes/stage-form/stage-form.component';
import {SequenceOfStagesComponent} from './new-processes/sequence-of-stages/sequence-of-stages.component';
import {ProcessFormComponent} from './new-processes/process-form/process-form.component';
import {MatCardModule} from '@angular/material/card';
import {DynamicInputComponent} from './new-processes/process-form/dynamic-input/dynamic-input.component';
import {GeneralInformationComponent} from './new-processes/general-information/general-information.component';

@NgModule({
    declarations: [
        ProcessesComponent,
        NewProcessesComponent,
        DynamicInputComponent,
        StageFormComponent,
        SequenceOfStagesComponent,
        ProcessFormComponent,
        GeneralInformationComponent


    ],
    imports: [
        RouterModule.forChild(processesRoutes),
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

export class ProcessesModule {
}
