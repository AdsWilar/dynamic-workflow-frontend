import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RoleService} from '../../../../services/role-service.service';
import {Action} from '../../../../interfaces/action.interface';
import {RoleResponse} from '../../../../interfaces/responses/role-response.interface';

@Component({
    selector: 'view-role-actions',
    templateUrl: './view-role-actions.component.html'
})

export class ViewRoleActionComponent implements OnInit {
    role: RoleResponse;
    actions: Action[] = [];


    constructor(private dialog: MatDialog, private rolesService: RoleService, @Inject(MAT_DIALOG_DATA) private data: any) {
    }

    ngOnInit(): void {
        this.role = {
            id: null,
            name: null,
            description: null
        };
        this.listActions();
    }

    private listActions(): void {
        this.rolesService.getRoleActionsByRoleId(this.data.roleId).subscribe(resp => {
            this.role = resp.data.role;
            this.actions = resp.data.actions;
        });
    }


}
