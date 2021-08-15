import {Component, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../../services/department-service.service';

@Component({
    selector: 'list-my-requests',
    templateUrl: './list-my-request.component.html',
    styleUrls: ['/list-my-request.component.scss']
})
export class ListMyRequestComponent implements OnInit {

    departments: DepartmentResponse[] = [];
    panelOpenState = false;


    constructor(private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
    }
}
