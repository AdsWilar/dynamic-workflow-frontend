import {Component, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../../../services/department-service.service';

@Component({
    selector: 'approved-list',
    templateUrl: './approved-list.component.html',
    styleUrls: ['/approved-list.component.scss']
})
export class ApprovedListComponent implements OnInit {

    departments: DepartmentResponse[] = [];
    panelOpenState = false;


    constructor(private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
    }
}
