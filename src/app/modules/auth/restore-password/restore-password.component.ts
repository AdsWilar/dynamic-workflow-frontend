import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {FuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthManager} from 'app/core/auth/auth-manager';
import {RestorePasswordRequest} from '../../../interfaces/requests/restore-password-request.interface';
import {AccessService} from '../../../services/access-service.service';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './restore-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: FuseAnimations
})
export class RestorePasswordComponent implements OnInit {

    @ViewChild('restorePasswordNgForm') restorePasswordNgForm: NgForm;

    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };
    restorePasswordForm: FormGroup;
    showAlert: boolean = false;

    constructor(private formBuilder: FormBuilder, private accessService: AccessService) {
    }

    ngOnInit(): void {
        this.restorePasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    restorePassword(): void {
        if (this.restorePasswordForm.invalid) {
            return;
        }
        this.restorePasswordForm.disable();
        this.showAlert = false;

        const restorePasswordRequest: RestorePasswordRequest = {
            userEmail: this.restorePasswordForm.value.email
        };
        this.accessService.restorePassword(restorePasswordRequest).subscribe((response) => {
            const message = response.message;
            let type: FuseAlertType;
            if (response.success) {
                type = 'success';
            } else {
                type = 'error';
            }
            this.alert = {
                type   : type,
                message: message
            };

            this.restorePasswordForm.enable();
            this.restorePasswordNgForm.resetForm();
            this.showAlert = true;
        });
    }
}
