import {Component, OnInit} from '@angular/core';
import {FuseAnimations} from '../../../../../../../@fuse/animations';
import {FormBuilder} from '@angular/forms';
import {DepartmentResponse} from '../../../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../../../services/department-service.service';
import {InputType} from '../../../../../../interfaces/input-type.interface';
import {ThemePalette} from '@angular/material/core';
import {MatSelectChange} from '@angular/material/select';
import {HttpClient} from '@angular/common/http';
import {InputTypeService} from '../../../../../../services/input-type-service.service';

@Component({
    selector: 'input-dynamic',
    templateUrl: './input-dynamic.component.html',
    styleUrls: ['/input-dynamic.component.scss'],
    animations: FuseAnimations
})
export class InputDynamicComponent implements OnInit {


    departments: DepartmentResponse[] = [];


    inputTypes: InputType[] = [];
    inputTypeSelected: { name1: string, name2: string };
    color: ThemePalette = 'primary';
    checked = false;
    disabled = false;

    formFieldHelpers: string[] = [''];
    fileName = '';

    constructor(private _formBuilder: FormBuilder, private departmentService: DepartmentService, private http: HttpClient, private inputTypeService: InputTypeService) {
        this.inputTypeSelected = {name1: 'TEXT', name2: 'UPLOAD_FILE'};
    }

    ngOnInit(): void {
        // this.inputTypeService.getAllInputTypes().subscribe((response) => {
        //     this.inputTypes = response.data;
        //
        //     for (const inputType of this.inputTypes) {
        //     //     if (inputType.name === 'TEXT') {
        //     //         this.inputTypeSelected = inputType;
        //     //     }
        //     // }
        //
        // });
    }

    onSelectInputType(event: MatSelectChange): void {
        this.inputTypeSelected = event.value;
    }

    onFileSelected(event): void {

        const file: File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append('thumbnail', file);

            const upload$ = this.http.post('/api/thumbnail-upload', formData);

            upload$.subscribe();
        }
    }
}
