import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NewRoleComponent} from '../../../../../../../roles/new-role/new-role.component';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../../../../../../../@fuse/components/alert';
import {Action} from '../../../../../../../../../interfaces/action.interface';
import {ActionService} from '../../../../../../../../../services/action-service.service';
import {RoleService} from '../../../../../../../../../services/role-service.service';
import {RoleRequest} from '../../../../../../../../../interfaces/requests/role-request.interface';
import {CompleteRoleRequest} from '../../../../../../../../../interfaces/requests/complete-role-request.interface';
import {RequestService} from '../../../../../../../../../services/request-service.service';
import {RequestActionRequest} from '../../../../../../../../../interfaces/requests/request-action-request.interface';
import {Router} from '@angular/router';
import {RequestStatus} from '../../../../../../../../../shared/types/request-status.type';
import {ExecuteAction} from '../../../../../../../../../shared/types/execute-action.type';

@Component({
    selector: 'approve-request-dialog',
    templateUrl: './approve-request-dialog.component.html',
    styleUrls: ['./approve-request-dialog.component.scss']
})
export class ApproveRequestDialogComponent implements OnInit {

    @ViewChild('ApproveRequestNgForm') ApproveRequestRForm: NgForm;
    @ViewChild('rejectRequestNgForm') rejectRequestRForm: NgForm;
    showAlert: boolean = false;
    ApproveRequestForm: FormGroup;
    rejectRequestForm: FormGroup;
    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };

    executeAction: ExecuteAction;
    requestId: number;


    constructor(private router: Router, private formBuilder: FormBuilder, private actionService: ActionService, private requestService: RequestService,
                @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ApproveRequestDialogComponent>) {

    }

    ngOnInit(): void {
        this.ApproveRequestForm = this.formBuilder.group({
            commentary: ['', Validators.required],
            digitalCertificatePassword: ['', Validators.required]
        });

        this.rejectRequestForm = this.formBuilder.group({
            commentary: ['', Validators.required]
        });

        this.requestId = this.data.requestId;
        this.executeAction = this.data.action;
    }

    approve(): void {
        if (this.ApproveRequestForm.invalid) {
            return;
        }
        this.ApproveRequestForm.disable();
        this.showAlert = false;
        const requestActionRequest: RequestActionRequest = {
            executedAction: 'APPROVE',
            commentary: this.ApproveRequestForm.value.commentary,
            digitalCertificatePassword: this.ApproveRequestForm.value.digitalCertificatePassword
        };

        this.requestService.executeActionOnRequest(requestActionRequest, this.requestId).subscribe((response) => {
            console.log(response);
            this.ApproveRequestForm.enable();
            // this.ApproveRequestNgForm.resetForm();
            if (response.success) {
                // this.data.onRoleCreated();
                console.log('exito al aprobar');
                console.log(response.data);
                this.dialogRef.close();
                this.router.navigate(['salver-requests']);

            } else {
                this.alert = {
                    type: 'error',
                    message: response.message
                };
                this.showAlert = true;
            }
        });

    }

    reject(): void {
        if (this.rejectRequestForm.invalid) {
            return;
        }
        this.rejectRequestForm.disable();
        this.showAlert = false;
        const requestActionRequest: RequestActionRequest = {
            executedAction: 'REJECT',
            commentary: this.rejectRequestForm.value.commentary,
            digitalCertificatePassword: null
        };

        this.requestService.executeActionOnRequest(requestActionRequest, this.requestId).subscribe((response) => {
            console.log(response);
            this.rejectRequestForm.enable();
            // this.ApproveRequestNgForm.resetForm();
            if (response.success) {
                // this.data.onRoleCreated();
                console.log('exito al rechazar');
                console.log(response.data);
                this.dialogRef.close();
                this.router.navigate(['salver-requests']);

            } else {
                this.alert = {
                    type: 'error',
                    message: response.message
                };
                this.showAlert = true;
            }
        });

    }


}
