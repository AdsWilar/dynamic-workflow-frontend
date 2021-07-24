import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserFullNamePipe} from '../pipes/user-full-name.pipe';
import {UserStatusPipe} from '../pipes/user-status.pipe';
import {RoleNamePipe} from '../pipes/role-name.pipe';
import {Toaster} from './toaster';
import {DepartmentStatusPipe} from '../pipes/department-status.pipe';
import {UserFullInfoPipe} from '../pipes/user-full-info.pipe';

@NgModule({
    declarations: [
        UserFullNamePipe,
        UserStatusPipe,
        RoleNamePipe,
        DepartmentStatusPipe,
        UserFullInfoPipe
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
        UserFullInfoPipe
    ],
    providers: [
        Toaster
    ]
})
export class SharedModule {
}
