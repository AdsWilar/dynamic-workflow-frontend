import {Component, Input, OnInit} from '@angular/core';
import {RequestResponse} from '../../../../../interfaces/responses/request-response.interface';
import {RequestService} from "../../../../../services/request-service.service";
import {FileDownloadService} from "../../../../../services/file-download-service.service";

@Component({
    selector: 'list-my-requests',
    templateUrl: './list-my-request.component.html',
    styleUrls: ['/list-my-request.component.scss']
})
export class ListMyRequestComponent implements OnInit {

    displayedColumns: string[] = ['code', 'shippingTimestamp', 'status', 'downloadRequestForm'];
    @Input()
    requests: RequestResponse[];

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
