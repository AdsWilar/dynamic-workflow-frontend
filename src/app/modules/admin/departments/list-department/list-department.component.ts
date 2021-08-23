import {Component, Input, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';

@Component({
    selector: 'list-department',
    templateUrl: './list-department.component.html',
    styleUrls: ['./list-department.component.scss']
})
export class ListDepartmentComponent implements OnInit {

    displayedColumns: string[] = ['name', 'contactEmail', 'contactPhone', 'status', 'viewDetail'];
    @Input()
    departments: DepartmentResponse[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
