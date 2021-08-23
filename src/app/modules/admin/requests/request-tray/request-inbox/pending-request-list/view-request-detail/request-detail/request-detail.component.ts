import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RequestService} from '../../../../../../../../services/request-service.service';
import {RequestActionComponent} from './request-action/request-action.component';
import {ExecutedAction} from '../../../../../../../../shared/types/executed-action.type';
import {RequestDetailResponse} from '../../../../../../../../interfaces/responses/request-detail-response.interface';
import {RequestUtility} from '../../../../../../../../shared/utilities/request-utility';

@Component({
    selector: 'details-request',
    templateUrl: './request-detail.component.html',
    styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {

    @Input()
    requestId: number;
    requestDetail: RequestDetailResponse;

    constructor(private dialog: MatDialog, private requestService: RequestService,
                private requestUtility: RequestUtility) {
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

    openRequestActionDialog(executedAction: ExecutedAction): void {
        this.dialog.open(RequestActionComponent, {
            data: {
                requestId: this.requestId,
                action: executedAction
            }
        });
    }

    downloadRequestForm(): void {
        this.requestUtility.downloadRequestForm(this.requestId);
    }

}
