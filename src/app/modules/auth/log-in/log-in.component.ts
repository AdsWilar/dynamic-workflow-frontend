import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthManager} from 'app/core/auth/auth-manager';
import {AccessService} from '../../../services/access-service.service';
import {AccessRequest} from '../../../interfaces/requests/access-request.interface';
import {AccessResponse} from '../../../interfaces/responses/access-response.interface';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './log-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: FuseAnimations
})
export class LogInComponent implements OnInit {

    @ViewChild('logInNgForm') logInNgForm: NgForm;

    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };
    logInForm: FormGroup;
    showAlert: boolean = false;

    constructor(private formBuilder: FormBuilder, private accessService: AccessService,
                private authManager: AuthManager, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.logInForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    logIn(): void {
        if (this.logInForm.invalid) {
            return;
        }
        this.logInForm.disable();
        this.showAlert = false;

        const accessRequest: AccessRequest = {
            username: this.logInForm.value.username,
            password: this.logInForm.value.password
        };
        
        this.accessService.logIn(accessRequest).subscribe((response) => {
            if (response.success) {
                this.authManager.setAuthData(response.data);

                const redirectURL =
                    this.activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/logged-in-redirect';
                this.router.navigateByUrl(redirectURL);
                return;
            }
            this.logInForm.enable();
            this.logInNgForm.resetForm();
            this.alert = {
                type: 'error',
                message: response.message
            };
            this.showAlert = true;
        });
    }
}
