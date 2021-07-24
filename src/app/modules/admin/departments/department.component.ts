import {Component, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../services/department-service.service';
import {MatDialog} from '@angular/material/dialog';
import {NewDepartmentComponent} from './new-department/new-department.component';

@Component({
    selector: 'department',
    templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {

    departments: DepartmentResponse[] = [];

    constructor(private departmentService: DepartmentService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.listDepartments();
    }

    private listDepartments(): void {
        this.departmentService.getAllDepartmentsForCurrentUser()
            .subscribe((response) => {
                this.departments = response.data;
            });
    }

    openNewDepartmentDialog(): void {
        this.dialog.open(NewDepartmentComponent, {
            data: {
                onDepartmentCreated: this.onDepartmentCreated
            }
        });
    }

    onDepartmentCreated = (): void => {
        this.listDepartments();
    };

}
