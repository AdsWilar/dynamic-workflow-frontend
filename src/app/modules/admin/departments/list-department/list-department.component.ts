import {Component, Input, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {ViewUserActionComponent} from '../../users/view-user/view-user-actions.component';
import {ViewDepartmentComponent} from '../view-department/view-department.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'list-department',
    templateUrl: './list-department.component.html',
    styleUrls: ['./list-department.component.scss']
})
export class ListDepartmentComponent implements OnInit {

    displayedColumns: string[] = ['name', 'contactEmail', 'contactPhone', 'status', 'viewDetail'];
    @Input()
    departments: DepartmentResponse[];

    constructor(private router: Router, private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
    }

}
