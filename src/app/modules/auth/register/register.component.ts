import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthManager} from 'app/core/auth/auth-manager';
import {UserService} from '../../../services/user-service.service';
import {UserRequest} from '../../../interfaces/requests/user-request.interface';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: FuseAnimations
})
export class RegisterComponent implements OnInit {

    @ViewChild('registerNgForm') registerNgForm: NgForm;

    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };
    registerForm: FormGroup;
    showAlert: boolean = false;

    constructor(private formBuilder: FormBuilder, private userService: UserService, private _authService: AuthManager, private _router: Router) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
                username: ['', Validators.required],
                password: ['', Validators.required],
                passwordConfirmation: ['', Validators.required],
                names: ['', Validators.required],
                firstSurname: ['', Validators.required],
                secondSurname: [''],
                email: ['', [Validators.required, Validators.email]],
                phone: ['', Validators.required],
                identificationNumber: ['']
            }
        );
    }

    register(): void {
        if (this.registerForm.invalid) {
            return;
        }
        this.registerForm.disable();
        this.showAlert = false;

        const userRequest: UserRequest = {
            username: this.registerForm.value.username,
            password: this.registerForm.value.password,
            passwordConfirmation: this.registerForm.value.passwordConfirmation,
            names: this.registerForm.value.names,
            firstSurname: this.registerForm.value.firstSurname,
            secondSurname: this.registerForm.value.secondSurname,
            email: this.registerForm.value.email,
            phone: this.registerForm.value.phone,
            identificationNumber: this.registerForm.value.identificationNumber
        };

        this.userService.registerRequestingUser(userRequest).subscribe((response) => {
            const message = response.message;
            let type: FuseAlertType;
            if (response.success) {
                type = 'success';
            } else {
                type = 'error';
            }
            this.alert = {
                type: type,
                message: message
            };

            this.registerForm.enable();
            this.registerNgForm.resetForm();
            this.showAlert = true;
        });
    }
}
