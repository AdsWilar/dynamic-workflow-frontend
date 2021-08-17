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
import {UserService} from '../../../../services/user-service.service';
import {UserResponse} from '../../../../interfaces/responses/user-response.interface';
import {
    DepartmentsItem,
    MyRequestsItem, NewRequestItem,
    ProcessesItem, RequestsItem,
    RolesItem, SalverRequestsItem,
    StartupProfileItem,
    UsersItem
} from '../../../../shared/constant';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {

    data: InitialData;
    isScreenSmall: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    navigation: FuseNavigationItem[];
    user: UserData;

    constructor(private _activatedRoute: ActivatedRoute, private authManager: AuthManager, private _router: Router,
                private _fuseMediaWatcherService: FuseMediaWatcherService,
                private _fuseNavigationService: FuseNavigationService, private userService: UserService) {
        this.navigation = [];
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
            email: null,
            phone: null,
            identificationNumber: null,
            code: null
        };
    }

    private initializeNavigation(): void {
        this.navigation.push(StartupProfileItem);
        if (this.authManager.hasAction('ROLE_GET_ALL')) {
            this.navigation.push(RolesItem);
        }
        if (this.authManager.hasAction('USER_GET_ALL')) {
            this.navigation.push(UsersItem);
        }
        if (this.authManager.hasAction('DEPARTMENT_GET_ALL')) {
            this.navigation.push(DepartmentsItem);
        }
        if (this.authManager.hasAction('PROCESS_GET_ALL')) {
            this.navigation.push(ProcessesItem);
        }
        if (this.authManager.hasAction('PROCESS_GET_ALL')) {
            this.navigation.push(ProcessesItem);
        }
        const requestItems: FuseNavigationItem[] = [];
        if (this.authManager.hasAction('REQUEST_REGISTER')) {
            requestItems.push(NewRequestItem);
        }
        if (this.authManager.hasAction('REQUEST_GET_ALL_CURRENT_USER')) {
            requestItems.push(MyRequestsItem);
        }
        if (this.authManager.hasAction('REQUEST_EXECUTE_ACTION')) {
            requestItems.push(SalverRequestsItem);
        }
        if (requestItems.length !== 0) {
            const requestsItem: FuseNavigationItem = RequestsItem;
            requestsItem.children = requestItems;
            this.navigation.push(requestsItem);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.initializeNavigation();
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
        this.userService.getCurrentUser().subscribe((response) => {
            const userResponse: UserResponse = response.data;
            this.user.username = userResponse.username;
            this.user.names = userResponse.names;
            this.user.firstSurname = userResponse.firstSurname;
            this.user.secondSurname = userResponse.secondSurname;
            this.user.email = userResponse.email;
            this.user.phone = userResponse.phone;
            this.user.identificationNumber = userResponse.identificationNumber;
            this.user.code = userResponse.code;
        });
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
