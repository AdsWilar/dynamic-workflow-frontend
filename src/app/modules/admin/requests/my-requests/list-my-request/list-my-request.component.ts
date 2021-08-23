import {Component, Input, OnInit} from '@angular/core';
import {RequestResponse} from '../../../../../interfaces/responses/request-response.interface';
import {RequestService} from "../../../../../services/request-service.service";
import {FileDownloadService} from "../../../../../services/file-download-service.service";
import {RequestUtility} from "../../../../../shared/utilities/request-utility";

@Component({
    selector: 'list-my-requests',
    templateUrl: './list-my-request.component.html',
    styleUrls: ['/list-my-request.component.scss']
})
export class ListMyRequestComponent implements OnInit {

    displayedColumns: string[] = ['code', 'shippingTimestamp', 'status', 'downloadRequestForm'];
    @Input()
    requests: RequestResponse[];

    constructor(private requestUtility: RequestUtility) {
    }

    ngOnInit(): void {
    }

    downloadRequestForm(requestId: number): void {
        this.requestUtility.downloadRequestForm(requestId);
    }

}
