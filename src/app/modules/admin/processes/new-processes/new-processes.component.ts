import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProcessStatus} from '../../../../shared/types/process-status.type';
import {ProcessStatuses} from '../../../../shared/constant';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../services/department-service.service';

@Component({
    selector: 'new-processes',
    templateUrl: './new-processes.component.html',
    styleUrls: ['/new-process.component.scss'],
    animations: FuseAnimations
})
export class NewProcessesComponent implements OnInit {

    horizontalStepperForm: FormGroup;
    processStatuses: ProcessStatus[] = ProcessStatuses;
    departments: DepartmentResponse[] = [];

    constructor(private _formBuilder: FormBuilder, private departmentService: DepartmentService) {
    }

    ngOnInit(): void {

        // Horizontal stepper form
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                name: ['', Validators.required],
                description: [''],
                status: ['ACTIVE', Validators.required],
                departmentId: ['', Validators.required]
            }),
            step2: this._formBuilder.group({}),
            step3: this._formBuilder.group({
                name: ['', Validators.required],
                description: ['']

            })
        });

        this.departmentService.getAllDepartmentsForCurrentUser()
            .subscribe((response) => {
                this.departments = response.data;
            });
    }


}
