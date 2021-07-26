import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewRoleComponent} from './new-role/new-role.component';
import {RoleResponse} from '../../../interfaces/responses/role-response.interface';
import {RoleService} from '../../../services/role-service.service';

@Component({
    selector: 'role',
    templateUrl: './role.component.html'
})


export class RoleComponent implements OnInit {
    roles: RoleResponse[] = [];

    // updateListRoles: void = this.updateListRoles;
    constructor(private dialog: MatDialog, private rolesService: RoleService) {
    }

    ngOnInit(): void {
        this.listRoles();
    }

    private listRoles(): void {
        this.rolesService.getAllRoles().subscribe(resp => {
            this.roles = resp.data;
        });
    }

    onGoToNew(): void {
        // this.dialog.open();
    }

    newRoleDialog(): void {
        this.dialog.open(NewRoleComponent, {
            data: {
                onRoleCreated: this.onRoleCreated
            }
        });
    }

    onRoleCreated = (): void => {
        this.listRoles();
    }

    updateListRoles = () => {
        this.listRoles();
    }


}
