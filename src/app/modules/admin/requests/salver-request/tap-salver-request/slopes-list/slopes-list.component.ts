import {Component, Input, OnInit} from '@angular/core';
import {RequestResponse} from '../../../../../../interfaces/responses/request-response.interface';
import {RequestStatus} from '../../../../../../shared/types/request-status.type';

@Component({
    selector: 'slopes-list',
    templateUrl: './slopes-list.component.html',
    styleUrls: ['/slopes-list.component.scss']
})
export class SlopesListComponent implements OnInit {

    displayedColumns: string[] = ['code', 'finishTimestamp', 'status', 'viewDetail'];
    requestStatuses: RequestStatus[] = ['IN_PROCESS', 'APPROVED', 'REJECTED'];
    @Input()
    requests: RequestResponse[];


    constructor() {
    }

    ngOnInit(): void {
    }
}
