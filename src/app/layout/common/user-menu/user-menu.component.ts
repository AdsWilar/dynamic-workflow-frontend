import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {UserData} from '../../../interfaces/data/user-data.interface';
import {AuthManager} from '../../../core/auth/auth-manager';

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'userMenu'
})
export class UserMenuComponent implements OnInit, OnDestroy {

    @Input() username: string;

    private unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    logOut(): void {
        this.router.navigate(['/log-out']);
    }

}
