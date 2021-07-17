import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Subject, timer} from 'rxjs';
import {finalize, takeUntil, takeWhile, tap} from 'rxjs/operators';
import {AuthManager} from 'app/core/auth/auth-manager';

@Component({
    selector: 'log-out',
    templateUrl: './log-out.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LogOutComponent implements OnInit, OnDestroy {

    countdown: number = 5;
    countdownMapping: any = {
        '=1': '# segundo',
        'other': '# segundos'
    };
    private unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private authManager: AuthManager, private _router: Router) {
    }

    ngOnInit(): void {
        this.authManager.clearAuthData();

        timer(1000, 1000)
            .pipe(
                finalize(() => {
                    this._router.navigate(['log-in']);
                }),
                takeWhile(() => this.countdown > 0),
                takeUntil(this.unsubscribeAll),
                tap(() => this.countdown--)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
