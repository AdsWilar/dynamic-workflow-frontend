import {Component, Input, OnInit} from '@angular/core';
import {RequestResponse} from '../../../../../../interfaces/responses/request-response.interface';
import {FileDownloadService} from '../../../../../../services/file-download-service.service';
import {RequestService} from '../../../../../../services/request-service.service';
import {RequestUtility} from '../../../../../../shared/utilities/request-utility';

@Component({
    selector: 'finished-request-list',
    templateUrl: './finished-request-list.component.html',
    styleUrls: ['./finished-request-list.component.scss']
})
export class FinishedRequestListComponent implements OnInit {

    displayedColumns: string[] = ['code', 'shippingTimestamp', 'finishTimestamp', 'status', 'downloadRequestForm'];
    @Input()
    finishedRequests: RequestResponse[];

    constructor(private requestUtility: RequestUtility) {
    }

    ngOnInit(): void {
    }

    downloadRequestForm(requestId: number): void {
        this.requestUtility.downloadRequestForm(requestId);
    }

}
