import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {RequestResponse} from '../../../../../interfaces/responses/request-response.interface';
import {RequestService} from '../../../../../services/request-service.service';


@Component({
    selector: 'tap-salver-request',
    templateUrl: './tap-salver-request.component.html',
    styleUrls: ['./tap-salver-request.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class TapSalverRequestComponent implements OnInit {

    requests: RequestResponse[];


    constructor(private requestsService: RequestService) {
        this.requests = [];
    }

    ngOnInit(): void {
        this.requestsService.getPendingRequestsForCurrentAnalyst()
            .subscribe((response) => {
                if (response.success) {
                    this.requests = response.data;
                }
            });
    }
}
