import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../../../../../../../@fuse/components/alert';
import {RequestService} from '../../../../../../../../../services/request-service.service';
import {RequestActionRequest} from '../../../../../../../../../interfaces/requests/request-action-request.interface';
import {Router} from '@angular/router';
import {ExecutedAction} from '../../../../../../../../../shared/types/executed-action.type';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'approve-request-dialog',
    templateUrl: './request-action.component.html'
})
export class RequestActionComponent implements OnInit {

    @ViewChild('ApproveRequestNgForm') approveRequestNgForm: NgForm;
    @ViewChild('rejectRequestNgForm') rejectRequestNgForm: NgForm;
    showAlert: boolean = false;
    approveRequestForm: FormGroup;
    rejectRequestForm: FormGroup;
    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };

    executedAction: ExecutedAction;
    requestId: number;

    constructor(private router: Router, private formBuilder: FormBuilder, private requestService: RequestService,
                @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<RequestActionComponent>,
                private toaster: ToastrService) {
    }

    ngOnInit(): void {
        this.approveRequestForm = this.formBuilder.group({
            commentary: ['', Validators.required],
            digitalCertificatePassword: ['', Validators.required]
        });

        this.rejectRequestForm = this.formBuilder.group({
            commentary: ['', Validators.required]
        });

        this.requestId = this.data.requestId;
        this.executedAction = this.data.action;
    }

    approve(): void {
        if (this.approveRequestForm.invalid) {
            return;
        }
        this.approveRequestForm.disable();
        this.showAlert = false;
        const requestActionRequest: RequestActionRequest = {
            executedAction: this.executedAction,
            commentary: this.approveRequestForm.value.commentary,
            digitalCertificatePassword: this.approveRequestForm.value.digitalCertificatePassword
        };
        this.executeActionOnRequest(requestActionRequest, 'Solicitud aprobada.');
    }

    reject(): void {
        if (this.rejectRequestForm.invalid) {
            return;
        }
        this.rejectRequestForm.disable();
        this.showAlert = false;
        const requestActionRequest: RequestActionRequest = {
            executedAction: this.executedAction,
            commentary: this.rejectRequestForm.value.commentary
        };

        this.executeActionOnRequest(requestActionRequest, 'Solicitud rechazada.');

    }

    private executeActionOnRequest(requestActionRequest: RequestActionRequest, successMessage: string): void {
        this.requestService.executeActionOnRequest(requestActionRequest, this.requestId)
            .subscribe((response) => {
                const title: string = 'Solicitudes';
                if (response.success) {
                    this.toaster.success(successMessage, title);
                    this.dialogRef.close();
                    this.router.navigate(['requests/request-tray']);
                } else {
                    this.toaster.error(response.message, title);
                    this.approveRequestForm.enable();
                    this.rejectRequestForm.enable();
                    // this.alert = {
                    //     type: 'error',
                    //     message: response.message
                    // };
                    // this.showAlert = true;
                }
            });
    }

}
