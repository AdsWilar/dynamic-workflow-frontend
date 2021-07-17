import { Component, ViewEncapsulation } from '@angular/core';
import { FuseAnimations } from '@fuse/animations';
import { AuthManager } from 'app/core/auth/auth-manager';
import { Router } from '@angular/router';

@Component({
    selector     : 'sign-out-modern-reversed',
    templateUrl  : './sign-out.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : FuseAnimations
})
export class SignOutModernReversedComponent
{
    countdown: number = 5;
    countdownMapping: any = {
        '=1'   : '# second',
        'other': '# seconds'
    };

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthManager,
        private _router: Router
    )
    {
    }
}
