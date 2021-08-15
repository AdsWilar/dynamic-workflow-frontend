import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserFullNamePipe} from './pipes/user-full-name.pipe';
import {UserStatusPipe} from './pipes/user-status.pipe';
import {RoleNamePipe} from './pipes/role-name.pipe';
import {Toaster} from './toaster';
import {DepartmentStatusPipe} from './pipes/department-status.pipe';
import {UserFullInfoPipe} from './pipes/user-full-info.pipe';
import {InputTypeNamePipe} from './pipes/input-type-name.pipe';
import {ProcessStatusPipe} from './pipes/process-status.pipe';
import {FileChooserComponent} from "./file-chooser/file-chooser.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        UserFullNamePipe,
        UserStatusPipe,
        RoleNamePipe,
        DepartmentStatusPipe,
        UserFullInfoPipe,
        InputTypeNamePipe,
        ProcessStatusPipe,

        FileChooserComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserFullNamePipe,
        UserStatusPipe,
        RoleNamePipe,
        DepartmentStatusPipe,
        UserFullInfoPipe,
        InputTypeNamePipe,
        ProcessStatusPipe,

        FileChooserComponent
    ],
    providers: [
        Toaster
    ]
})
export class SharedModule {
}
