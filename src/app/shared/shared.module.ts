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

@NgModule({
    declarations: [
        UserFullNamePipe,
        UserStatusPipe,
        RoleNamePipe,
        DepartmentStatusPipe,
        UserFullInfoPipe,
        InputTypeNamePipe,
        ProcessStatusPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
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
        ProcessStatusPipe
    ],
    providers: [
        Toaster
    ]
})
export class SharedModule {
}
