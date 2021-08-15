import {Component, Input, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../../interfaces/responses/department-response.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DepartmentService} from '../../../../../services/department-service.service';

@Component({
    selector: 'new-process-request',
    templateUrl: './new-process-request.component.html',
    styleUrls: ['./new-process-request.component.scss']
})
export class NewProcessRequestComponent implements OnInit {
    private subscription: Subscription;
    private departmentId: number;
    department: DepartmentResponse;

    @Input()
    departments: DepartmentResponse[];

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
        this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('id') != null) {
                this.departmentId = +params.get('id');
                console.log(this.departmentId);
                this.departmentService.getCompleteDepartmentById(this.departmentId).subscribe((response) => {
                    this.department = response.data.department;
                });
            }
        });
    }

}
