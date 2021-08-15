import {Component, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../../services/department-service.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'view-processes',
    templateUrl: './view-processes.component.html',
    styleUrls: ['/view-processes.component.scss']
})
export class ViewProcessesComponent implements OnInit {

    private subscription: Subscription;
    private departmentId: number;
    departments: DepartmentResponse[] = [];

    department: DepartmentResponse;
    departmentSubordinate: DepartmentResponse[];


    constructor(private departmentService: DepartmentService, private activatedRoute: ActivatedRoute) {

        this.department = {
            id: null,
            name: null,
            contactEmail: null,
            contactPhone: null,
            location: null,
            creationTimestamp: null,
            modificationTimestamp: null,
            status: null,
            parentDepartmentId: null,
            parentDepartment: null,
            subordinateDepartments: null
        };

    }

    ngOnInit(): void {
        this.listDepartments();

        this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('id') != null) {
                this.departmentId = +params.get('id');
                console.log(this.departmentId);
                this.departmentService.getCompleteDepartmentById(this.departmentId).subscribe((response) => {
                    // this.completeDepartment = response.data;
                    this.department = response.data.department;
                    // this.departmentBoss = response.data.departmentBoss;
                    // this.analystMembers = response.data.analystMembers;
                });
            }
        });

    }

    private listDepartments(): void {
        this.departmentService.getAllDepartmentsForCurrentUser()
            .subscribe((response) => {
                this.departments = response.data;
            });
    }
}
