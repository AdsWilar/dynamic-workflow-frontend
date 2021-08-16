import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RequestService} from '../../../../../../../../services/request-service.service';
import {ApproveRequestDialogComponent} from './approve-request-dialog/approve-request-dialog.component';
import {ExecuteAction} from '../../../../../../../../shared/types/execute-action.type';

@Component({
    selector: 'details-request',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    displayedColumns: string[] = ['name', 'contactEmail', 'contactPhone', 'status', 'viewDetail'];
    @Input()
    requestId: number;

    constructor(private dialog: MatDialog, private requestService: RequestService) {
    }

    ngOnInit(): void {
    }

    approveRequestDialog(requestId: number): void {
        const executeAction: ExecuteAction = 'APPROVE';
        this.dialog.open(ApproveRequestDialogComponent, {
            data: {
                requestId: requestId,
                action: executeAction
            }
        });
    }

    rejectRequestDialog(requestId: number): void {
        const executeAction: ExecuteAction = 'REJECT';
        this.dialog.open(ApproveRequestDialogComponent, {
            data: {
                requestId: requestId,
                action: executeAction
            }
        });
    }

}
