import {Component, Input, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../../interfaces/responses/department-response.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentService} from '../../../../../services/department-service.service';

@Component({
    selector: 'department-process-list',
    templateUrl: './department-process-list.component.html',
    styleUrls: ['./department-process-list.component.scss']
})
export class DepartmentProcessListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'contactEmail', 'contactPhone', 'status', 'viewDetail'];
    @Input()
    departments: DepartmentResponse[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
