import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserFullNamePipe} from '../pipes/user-full-name.pipe';
import {UserStatusPipe} from '../pipes/user-status.pipe';
import {RoleNamePipe} from '../pipes/role-name.pipe';
import {Toaster} from './toaster';

@NgModule({
    declarations: [
        UserFullNamePipe,
        UserStatusPipe,
        RoleNamePipe
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
        RoleNamePipe
    ],
    providers: [
        Toaster
    ]
})
export class SharedModule {
}
