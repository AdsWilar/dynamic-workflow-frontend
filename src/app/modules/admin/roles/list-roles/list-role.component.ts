import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {RoleResponse} from 'app/interfaces/responses/role-response.interface';
import {ViewRoleActionComponent} from '../view-role-actions/view-role-actions.component';
import {EditRoleComponent} from '../edit-role/edit-role.component';
import {MainRoles} from '../../../../shared/constant';

@Component({
    selector: 'list-role',
    templateUrl: './list-role.component.html',
    styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {
    displayedColumns: string[] = ['name', 'description', 'actions', 'options'];
    @Input()
    roles: RoleResponse[];
    @Input()
    updateListRoles;

    constructor(private router: Router, private dialog: MatDialog) {

    }

    ngOnInit(): void {

    }

    viewRoleActionsDialog(roleId: number): void {
        this.dialog.open(ViewRoleActionComponent, {
            data: {
                roleId: roleId
            }
        });
    }

    editRoleDialog(roleId: number): void {
        this.dialog.open(EditRoleComponent, {
            data: {
                roleId: roleId,
                onRoleEdited: this.onRoleEdited
            }
        });
    }

    isMainRole(roleName: string): boolean {
        return MainRoles.includes(roleName);
    }

    onRoleEdited = (): void => {
        this.updateListRoles();
    }


}
