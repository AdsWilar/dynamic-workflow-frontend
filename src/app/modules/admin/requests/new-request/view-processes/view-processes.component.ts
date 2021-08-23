import {Component, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../../services/department-service.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'view-processes',
    templateUrl: './view-processes.component.html'
})
export class ViewProcessesComponent implements OnInit {

    private subscription: Subscription;
    private departmentId: number;
    department: DepartmentResponse;

    constructor(private departmentService: DepartmentService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('departmentId') != null) {
                this.departmentId = +params.get('departmentId');
                console.log(this.departmentId);
                this.departmentService.getDepartmentById(this.departmentId)
                    .subscribe((response) => {
                        this.department = response.data;
                    });
            }
        });
    }

}
