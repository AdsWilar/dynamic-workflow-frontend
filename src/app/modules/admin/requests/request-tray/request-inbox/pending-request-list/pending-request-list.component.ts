import {Component, Input, OnInit} from '@angular/core';
import {RequestResponse} from '../../../../../../interfaces/responses/request-response.interface';

@Component({
    selector: 'pending-request-list',
    templateUrl: './pending-request-list.component.html',
    styleUrls: ['./pending-request-list.component.scss']
})
export class PendingRequestListComponent implements OnInit {

    displayedColumns: string[] = ['code', 'shippingTimestamp', 'status', 'viewDetail'];
    @Input()
    pendingRequests: RequestResponse[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
