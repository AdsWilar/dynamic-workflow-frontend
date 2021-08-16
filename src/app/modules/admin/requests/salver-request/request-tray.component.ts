import {Component, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../services/department-service.service';

@Component({
    selector: 'requests-tray',
    templateUrl: './request-tray.component.html',
    styleUrls: ['/request-tray.component.scss']
})
export class RequestTrayComponent implements OnInit {

    departments: DepartmentResponse[] = [];
    panelOpenState = false;


    constructor(private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
    }
}
