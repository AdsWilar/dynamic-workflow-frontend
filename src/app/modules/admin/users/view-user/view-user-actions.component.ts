import {Component, Inject, OnInit} from '@angular/core';
import {RoleResponse} from '../../../../interfaces/responses/role-response.interface';
import {Action} from '../../../../interfaces/action.interface';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {RoleService} from '../../../../services/role-service.service';
import {UserService} from '../../../../services/user-service.service';
import {UserResponse} from '../../../../interfaces/responses/user-response.interface';

@Component({
    selector: 'view-user-actions',
    templateUrl: './view-user-actions.component.html'
})

export class ViewUserActionComponent implements OnInit {
    user: UserResponse;
    actions: Action[] = [];


    constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any, private userService: UserService) {
    }

    ngOnInit(): void {
        this.user = {
            id: null,
            username: null,
            status: null,
            names: null,
            firstSurname: null,
            secondSurname: null,
            phone: null,
            email: null,
            code: null,
            creationTimestamp: null,
            identificationNumber: null,
            modificationTimestamp: null
        };
        const userId: number = this.data.userId;
        console.log(this.user);
        this.userService.getUserActionByUserId(userId).subscribe(response => {
            this.actions = response.data.actions;
        });

    }

}
