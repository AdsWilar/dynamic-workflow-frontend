import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RequestService} from '../../../../../../../../services/request-service.service';
import {ApproveRequestDialogComponent} from './approve-request-dialog/approve-request-dialog.component';
import {ExecuteAction} from '../../../../../../../../shared/types/execute-action.type';
import {FileDownloadService} from '../../../../../../../../services/file-download-service.service';
import {RequestDetailResponse} from '../../../../../../../../interfaces/responses/request-detail-response.interface';

@Component({
    selector: 'details-request',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    @Input()
    requestId: number;

    requestDetail: RequestDetailResponse;

    constructor(private dialog: MatDialog, private requestService: RequestService,
                private fileDownloadService: FileDownloadService) {
    }

    ngOnInit(): void {
        this.loadRequestDetail();
    }

    private loadRequestDetail(): void {
        this.requestService.getRequestDetailByRequestId(this.requestId)
            .subscribe((response) => {
                if (response.success) {
                    this.requestDetail = response.data;
                }
            });
    }

    approveRequestDialog(): void {
        const executeAction: ExecuteAction = 'APPROVE';
        this.dialog.open(ApproveRequestDialogComponent, {
            data: {
                requestId: this.requestId,
                action: executeAction
            }
        });
    }

    rejectRequestDialog(): void {
        const executeAction: ExecuteAction = 'REJECT';
        this.dialog.open(ApproveRequestDialogComponent, {
            data: {
                requestId: this.requestId,
                action: executeAction
            }
        });
    }

    downloadRequestForm(): void {
        this.requestService.downloadRequestFormByRequestId(this.requestId)
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
