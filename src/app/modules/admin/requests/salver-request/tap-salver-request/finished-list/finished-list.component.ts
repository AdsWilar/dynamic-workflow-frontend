import {Component, Input, OnInit} from '@angular/core';
import {RequestStatus} from '../../../../../../shared/types/request-status.type';
import {RequestResponse} from '../../../../../../interfaces/responses/request-response.interface';

@Component({
    selector: 'finished-list',
    templateUrl: './finished-list.component.html',
    styleUrls: ['/finished-list.component.scss']
})
export class FinishedListComponent implements OnInit {

    displayedColumns: string[] = ['code', 'finishTimestamp', 'status', 'viewDetail'];
    requestStatuses: RequestStatus[] = ['IN_PROCESS', 'APPROVED', 'REJECTED'];
    @Input()
    requests: RequestResponse[];


    constructor() {
    }

    ngOnInit(): void {
    }
}