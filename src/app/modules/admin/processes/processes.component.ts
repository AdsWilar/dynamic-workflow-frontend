import {Component, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../services/department-service.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'processes',
    templateUrl: './processes.component.html'
})
export class ProcessesComponent implements OnInit {

    departments: DepartmentResponse[] = [];

    constructor(private departmentService: DepartmentService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }
}
