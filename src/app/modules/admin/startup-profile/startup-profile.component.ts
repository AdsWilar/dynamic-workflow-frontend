import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {UserData} from '../../../interfaces/data/user-data.interface';
import {UserService} from '../../../services/user-service.service';
import {UserResponse} from '../../../interfaces/responses/user-response.interface';

@Component({
    selector: 'project',
    templateUrl: './startup-profile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
})
export class StartupProfileComponent implements OnInit, OnDestroy {

    userData: UserData;
    private unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private userService: UserService) {
        this.init();
    }

    private init(): void {
        this.userData = {
            names: null,
            firstSurname: null,
            secondSurname: null,
            email: null,
            phone: null
        };
    }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe((response) => {
            if (response.success) {
                const userResponse: UserResponse = response.data;
                this.userData.names = userResponse.names;
                this.userData.firstSurname = userResponse.firstSurname;
                this.userData.secondSurname = userResponse.secondSurname;
                this.userData.email = userResponse.email;
                this.userData.phone = userResponse.phone;
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
