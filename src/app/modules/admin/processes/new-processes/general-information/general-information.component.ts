import {Component, Inject, Input, OnInit} from '@angular/core';
import {FuseAnimations} from '../../../../../../@fuse/animations';
import {ProcessStatus} from '../../../../../shared/types/process-status.type';
import {ProcessStatuses} from '../../../../../shared/constant';
import {DepartmentService} from '../../../../../services/department-service.service';
import {DepartmentResponse} from '../../../../../interfaces/responses/department-response.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'general-information',
    templateUrl: './general-information.component.html',
    animations: FuseAnimations
})
export class GeneralInformationComponent implements OnInit {
    generalInformationForm: FormGroup;
    processStatuses: ProcessStatus[] = ProcessStatuses;
    departments: DepartmentResponse[] = [];


    constructor(private formBuilder: FormBuilder, private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
        this.generalInformationForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            status: ['ACTIVE', Validators.required],
            departmentId: ['', Validators.required]
        });
        // Horizontal stepper form
        // this.horizontalStepperForm = this._formBuilder.group({
        //     step1: this._formBuilder.group({
        //         name: ['', Validators.required],
        //         description: [''],
        //         status: ['ACTIVE', Validators.required],
        //         departmentId: ['', Validators.required]
        //     }),
        //     step2: this._formBuilder.group({
        //
        //     }),
        //     step3: this._formBuilder.group({
        //         byEmail: this._formBuilder.group({
        //             companyNews: [true],
        //             featuredProducts: [false],
        //             messages: [true]
        //         }),
        //         pushNotifications: ['everything', Validators.required]
        //     })
        // });
        this.departmentService.getAllDepartmentsForCurrentUser()
            .subscribe((response) => {
                this.departments = response.data;
            });
    }
}
