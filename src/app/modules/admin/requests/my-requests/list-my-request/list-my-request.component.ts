import {Component, Input, OnInit} from '@angular/core';
import {RequestResponse} from '../../../../../interfaces/responses/request-response.interface';

@Component({
    selector: 'list-my-requests',
    templateUrl: './list-my-request.component.html',
    styleUrls: ['/list-my-request.component.scss']
})
export class ListMyRequestComponent implements OnInit {

    displayedColumns: string[] = ['code', 'shippingTimestamp', 'status', 'viewDetail'];
    @Input()
    requests: RequestResponse[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
