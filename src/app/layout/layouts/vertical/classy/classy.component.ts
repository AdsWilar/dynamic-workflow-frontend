import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';
import {FuseNavigationItem, FuseNavigationService} from '@fuse/components/navigation';
import {InitialData} from 'app/app.types';
import {UserData} from '../../../../interfaces/data/user-data.interface';
import {AuthManager} from '../../../../core/auth/auth-manager';
import {AccessResponse} from '../../../../interfaces/responses/access-response.interface';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {

    data: InitialData;
    isScreenSmall: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    navigation: FuseNavigationItem[] = [
        {
            id   : 'startup-profile',
            title: 'Perfil',
            type : 'basic',
            icon : 'mat_solid:person',
            link : '/startup-profile'
        },
        {
            id   : 'roles',
            title: 'Roles',
            type : 'basic',
            icon : 'heroicons_outline:document-text',
            link : '/roles'
        },
        {
            id   : 'users',
            title: 'Usuarios',
            type : 'basic',
            icon : 'mat_solid:people_alt',
            link : '/users'
        }
    ];
    user: UserData;

    constructor(private _activatedRoute: ActivatedRoute, private authManager: AuthManager, private _router: Router,
                private _fuseMediaWatcherService: FuseMediaWatcherService,
                private _fuseNavigationService: FuseNavigationService) {
        this.initialUser();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    private initialUser(): void {
        this.user = {
            username: null,
            names: null,
            firstSurname: null,
            secondSurname: null,
            fullName: null,
            email: null,
            phone: null
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // this.navigation = [];
        // Subscribe to the resolved route mock-api
        // this._activatedRoute.data.subscribe((data: Data) => {
        //     this.data = data.initialData;
        // });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
        this.loadUser();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    private loadUser(): void {
        if (this.authManager.isAuthenticated()) {
            const accessData: AccessResponse = this.authManager.getCurrentAuthData().accessData;
            this.user.username = accessData.username;
            this.user.fullName = accessData.userFullName;
            this.user.email = accessData.userEmail;
            this.user.phone = accessData.userPhoneNumber;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
