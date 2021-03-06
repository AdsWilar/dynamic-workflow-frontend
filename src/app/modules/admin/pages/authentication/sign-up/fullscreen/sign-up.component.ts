import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthManager } from 'app/core/auth/auth-manager';

@Component({
    selector     : 'sign-up-fullscreen',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : FuseAnimations
})
export class SignUpFullscreenComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType, message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthManager,
        private _formBuilder: FormBuilder
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signUpForm = this._formBuilder.group({
                name      : ['', Validators.required],
                email     : ['', [Validators.required, Validators.email]],
                password  : ['', Validators.required],
                company   : [''],
                agreements: ['', Validators.requiredTrue]
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signUp(): void
    {
    }
}
