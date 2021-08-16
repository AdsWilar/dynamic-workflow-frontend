import {Component, OnInit} from '@angular/core';
import {RequestResponse} from '../../../../interfaces/responses/request-response.interface';
import {RequestService} from '../../../../services/request-service.service';

@Component({
    selector: 'my-requests',
    templateUrl: './my-request.component.html',
    styleUrls: ['/my-request.component.scss']
})
export class MyRequestComponent implements OnInit {

    requests: RequestResponse[];

    constructor(private requestsService: RequestService) {
        this.requests = [];
    }

    ngOnInit(): void {
        this.listRequests();
    }

    private listRequests(): void {
        this.requestsService.getAllRequestsForCurrentUser().subscribe((response) => {
            if (response.success) {
                this.requests = response.data;
            }
        });
    }

}
