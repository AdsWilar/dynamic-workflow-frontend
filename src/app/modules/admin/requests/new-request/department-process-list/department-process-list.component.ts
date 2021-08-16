import {Component, Input, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../../interfaces/responses/department-response.interface';
import {FuseAnimations} from '../../../../../../@fuse/animations';
import {ProcessService} from '../../../../../services/process-service.service';
import {ProcessResponse} from '../../../../../interfaces/responses/process-response.interface';

@Component({
    selector: 'department-process-list',
    templateUrl: './department-process-list.component.html',
    styleUrls: ['./department-process-list.component.scss'],
    animations: FuseAnimations
})
export class DepartmentProcessListComponent implements OnInit {

    @Input()
    department: DepartmentResponse;
    processes: ProcessResponse[];

    constructor(private processService: ProcessService) {
        this.processes = [];
    }

    ngOnInit(): void {
        this.processService.getAllActiveProcessesByDepartmentId(this.department.id)
            .subscribe((response) => {
                this.processes = response.data;
            });
    }

}
