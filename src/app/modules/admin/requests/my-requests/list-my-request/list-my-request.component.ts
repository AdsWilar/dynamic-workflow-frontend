import {Component, Input, OnInit} from '@angular/core';
import {DepartmentResponse} from '../../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../../services/department-service.service';
import {RequestResponse} from '../../../../../interfaces/responses/request-response.interface';

@Component({
    selector: 'list-my-requests',
    templateUrl: './list-my-request.component.html',
    styleUrls: ['/list-my-request.component.scss']
})
export class ListMyRequestComponent implements OnInit {

    displayedColumns: string[] = ['code', 'finishTimestamp', 'status', 'viewDetail'];
    @Input()
    requests: RequestResponse[];


    constructor() {
    }

    ngOnInit(): void {
    }
}
