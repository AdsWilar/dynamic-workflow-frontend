import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {RequestResponse} from '../../../../../interfaces/responses/request-response.interface';
import {RequestService} from '../../../../../services/request-service.service';


@Component({
    selector: 'request-inbox',
    templateUrl: './request-inbox.component.html',
    styleUrls: ['./request-inbox.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class RequestInboxComponent implements OnInit {

    pendingRequests: RequestResponse[];
    finishedRequests: RequestResponse[];


    constructor(private requestsService: RequestService) {
        this.pendingRequests = [];
        this.finishedRequests = [];
    }

    ngOnInit(): void {
        this.requestsService.getPendingRequestsForCurrentAnalyst()
            .subscribe((response) => {
                if (response.success) {
                    this.pendingRequests = response.data;
                }
            });
        this.requestsService.getFinishedRequestsForCurrentAnalyst()
            .subscribe((response) => {
                if (response.success) {
                    this.finishedRequests = response.data;
                    console.log('paso po requestsPending');
                    console.log(this.finishedRequests);
                }
            });
    }
}
