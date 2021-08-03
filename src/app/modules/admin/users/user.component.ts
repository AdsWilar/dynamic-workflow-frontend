import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewUserComponent} from './new-user/new-user.component';
import {UserService} from '../../../services/user-service.service';
import {UserResponse} from '../../../interfaces/responses/user-response.interface';

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})


export class UserComponent implements OnInit {

    users: UserResponse[] = [];

    constructor(private dialog: MatDialog, private userService: UserService) {
    }

    ngOnInit(): void {
        this.listUsers();
    }

    private listUsers(): void {
        this.userService.getAllUsers().subscribe(resp => {
            this.users = resp.data;
        });
    }

    onGoToNew(): void {
        this.dialog.open(NewUserComponent, {
            data: {
                onUserCreated: this.onUserCreated
            }
        });
    }

    onUserCreated = (): void => {
        this.listUsers();
    };

    updateListUser = (): void => {
        this.listUsers();
    };

}
