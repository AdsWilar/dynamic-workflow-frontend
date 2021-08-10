import {Component, Input, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../../services/department-service.service';
import {FuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['/department-list.component.scss'],
    animations: FuseAnimations
})
export class DepartmentListComponent implements OnInit {
    @Input()
    department: DepartmentResponse;
    subordinateDepartments: DepartmentResponse[];


    constructor(private departmentService: DepartmentService) {

        this.subordinateDepartments = [];
    }

    ngOnInit(): void {

        this.subordinateDepartments = this.department.subordinateDepartments;
    }
}
