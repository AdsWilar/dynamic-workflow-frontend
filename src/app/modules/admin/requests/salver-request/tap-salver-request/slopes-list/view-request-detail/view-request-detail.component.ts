import {Component, Input, OnInit} from '@angular/core';
import {RequestStatus} from '../../../../../../../shared/types/request-status.type';
import {RequestResponse} from '../../../../../../../interfaces/responses/request-response.interface';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../../../../../../../services/request-service.service';

@Component({
    selector: 'view-request-detail',
    templateUrl: './view-request-detail.component.html',
    styleUrls: ['/view-request-detail.component.scss']
})
export class ViewRequestDetailComponent implements OnInit {

    private subscription: Subscription;
    requestId: number;
    requestResponse: RequestResponse[];


    constructor(private activatedRoute: ActivatedRoute, private requestService: RequestService) {
        this.requestResponse = [];
    }

    ngOnInit(): void {
        this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('requestId') != null) {
                this.requestId = +params.get('requestId');
                console.log(this.requestId);
                // this.requestService.getAllRequestsForCurrentUser().subscribe((response) => {
                //
                // });
            }
        });
    }
}
