import {Component, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../services/department-service.service';

@Component({
    selector: 'salver-requests',
    templateUrl: './salver-request.component.html',
    styleUrls: ['/salver-request.component.scss']
})
export class SalverRequestComponent implements OnInit {

    departments: DepartmentResponse[] = [];
    panelOpenState = false;


    constructor(private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
    }
}
