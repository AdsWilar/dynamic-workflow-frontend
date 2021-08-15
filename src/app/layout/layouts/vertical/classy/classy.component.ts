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
            id: 'startup-profile',
            title: 'Perfil',
            type: 'basic',
            icon: 'mat_solid:person',
            link: '/startup-profile'
        },
        {
            id: 'roles',
            title: 'Roles',
            type: 'basic',
            icon: 'heroicons_outline:document-text',
            link: '/roles'
        },
        {
            id: 'users',
            title: 'Usuarios',
            type: 'basic',
            icon: 'mat_solid:people_alt',
            link: '/users'
        },
        {
            id: 'departments',
            title: 'Departamentos',
            type: 'basic',
            icon: 'heroicons_outline:office-building',
            link: '/departments'
        },
        {
            id: 'processes',
            title: 'Procesos',
            type: 'basic',
            icon: 'work_outline',
            link: '/processes'
        },
        {
            id: 'requests',
            title: 'Solicitudes',
            type: 'collapsable',
            icon: 'heroicons_outline:pencil-alt',
            children: [
                {
                    id: 'new-request',
                    title: 'Nueva Solicitud',
                    type: 'basic',
                    link: '/requests/new-request/root'
                },
                {
                    id: 'my-requests',
                    title: 'Mis Solicitudes',
                    type: 'basic',
                    link: '/requests/my-requests'
                }
            ]
        },
    ];
    user: UserData;

    constructor(private _activatedRoute: ActivatedRoute, private authManager: AuthManager, private _router: Router,
                private _fuseMediaWatcherService: FuseMediaWatcherService,
                private _fuseNavigationService: FuseNavigationService, private userService: UserService) {
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
