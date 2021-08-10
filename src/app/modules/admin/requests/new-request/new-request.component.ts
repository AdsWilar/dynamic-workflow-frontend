import {Component, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../services/department-service.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'new-requests',
    templateUrl: './new-request.component.html',
    styleUrls: ['/new-request.component.scss']
})
export class NewRequestComponent implements OnInit {

    private dataSubscription: Subscription;
    private subscription: Subscription;
    departments: DepartmentResponse[] = [];
    private departmentId: number;
    department: DepartmentResponse;


    constructor(private departmentService: DepartmentService, private activatedRoute: ActivatedRoute) {
        // this.department = {
        //     id: null,
        //     name: null,
        //     contactEmail: null,
        //     contactPhone: null,
        //     location: null,
        //     creationTimestamp: null,
        //     modificationTimestamp: null,
        //     status: null,
        //     parentDepartmentId: null,
        //     parentDepartment: null,
        //     subordinateDepartments: null
        // };
    }

    ngOnInit(): void {

        this.dataSubscription = this.activatedRoute.data.subscribe((data) => {
            const isRoot: boolean = data.isRoot;
            if (isRoot) {
                this.departmentService.getRootDepartment().subscribe((response) => {
                    this.department = response.data;
                    console.log(this.department);
                });
            } else {
                this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
                    if (params.get('departmentId')) {
                        this.departmentId = +params.get('departmentId');
                        console.log(this.departmentId);
                        this.departmentService.getCompleteDepartmentById(this.departmentId).subscribe((response) => {
                            this.department = response.data.department;
                        });
                    }
                    // this.departmentService.getRootDepartment().subscribe((response) => {
                    //     this.department = response.data;
                    //     console.log(this.department);
                    // });

                });
            }

        });


    }
}
