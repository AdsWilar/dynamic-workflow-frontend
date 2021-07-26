import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserResponse } from 'app/interfaces/responses/user-response.interface';
import { UserService } from 'app/services/user-service.service';
import {EditRoleComponent} from '../../roles/edit-role/edit-role.component';
import {EditUserComponent} from '../edit-user/edit-user.component';

@Component({
    selector: 'list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss']
  })
  export class ListUserComponent implements OnInit {
    displayedColumns: string[] = ['username', 'name', 'firstSurname', 'secondSurname', 'email', 'actions', 'options'];
    @Input()
    users: UserResponse[];
    @Input()
    updateListUser;

    constructor(private router: Router, private dialog: MatDialog, private userService: UserService) {

    }

    ngOnInit(): void {

    }

    editUserDialog(userId: number): void {
        this.dialog.open(EditUserComponent, {
            data: {
                userId: userId,
                onRoleEdited: this.onRoleEdited
            }
        });
    }
    onRoleEdited = (): void => {
        this.updateListUser();
    }
}
