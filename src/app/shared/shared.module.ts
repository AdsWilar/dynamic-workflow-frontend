import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserFullNamePipe} from '../pipes/user-full-name.pipe';

@NgModule({
    declarations: [
        UserFullNamePipe
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
        UserFullNamePipe
    ]
})
export class SharedModule {
}
