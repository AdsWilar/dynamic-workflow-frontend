import {Component, Input, OnInit} from '@angular/core';
import {RequestResponse} from '../../../../../../interfaces/responses/request-response.interface';
import {FileDownloadService} from '../../../../../../services/file-download-service.service';
import {RequestService} from '../../../../../../services/request-service.service';

@Component({
    selector: 'finished-list',
    templateUrl: './finished-list.component.html',
    styleUrls: ['/finished-list.component.scss']
})
export class FinishedListComponent implements OnInit {

    displayedColumns: string[] = ['code', 'shippingTimestamp', 'finishTimestamp', 'status', 'downloadRequestForm'];
    @Input()
    requestsFinish: RequestResponse[];


    constructor(private requestService: RequestService, private fileDownloadService: FileDownloadService) {
    }

    ngOnInit(): void {
    }

    downloadRequestForm(requestId: number): void {
        this.requestService.downloadRequestFormByRequestId(requestId)
            .subscribe((response) => {
                if (response.success) {
                    this.fileDownloadService.downloadFile(response.data);
                    console.log(response.message);
                    console.log(response.data);
                    return;
                }
                console.log('Error al descargar el formulario de solicitud, ' + response.message);
        });
    }

}
