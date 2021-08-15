import {Component, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../services/department-service.service';

@Component({
    selector: 'my-requests',
    templateUrl: './my-request.component.html',
    styleUrls: ['/my-request.component.scss']
})
export class MyRequestComponent implements OnInit {

    departments: DepartmentResponse[] = [];
    panelOpenState = false;


    constructor(private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
    }
}
