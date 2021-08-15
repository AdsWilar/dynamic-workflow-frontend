import {Component, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../../../services/department-service.service';

@Component({
    selector: 'slopes-list',
    templateUrl: './slopes-list.component.html',
    styleUrls: ['/slopes-list.component.scss']
})
export class SlopesListComponent implements OnInit {

    departments: DepartmentResponse[] = [];
    panelOpenState = false;


    constructor(private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
    }
}
