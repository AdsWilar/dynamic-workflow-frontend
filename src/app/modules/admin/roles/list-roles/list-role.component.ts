import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {RoleResponse} from 'app/interfaces/responses/role-response.interface';
import {RoleService} from 'app/services/role-service.service';
import {ViewRoleActionComponent} from '../view-role-actions/view-role-actions.component';
import {EditRoleComponent} from '../edit-role/edit-role.component';

@Component({
    selector: 'list-role',
    templateUrl: './list-role.component.html',
    styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {
    displayedColumns: string[] = ['name', 'description', 'actions', 'options'];
    @Input()
    roles: RoleResponse[];

    constructor(private router: Router, private dialog: MatDialog, private rolesService: RoleService) {

    }

    ngOnInit(): void {

    }


    onGoToEdit(item: any): void {
        this.router.navigate(['role/edit']);
    }

    onGoToDelete(item: any): void {
        alert('Eliminardo');
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
                roleId: roleId
            }
        });
    }


    showRoleActions(roleId: number): void {
        //   this.rolesService.getRoleActionsByRoleId(roleId).subscribe(resp => {s
        //     console.log(resp);
        //     let action: Action[] = resp.data.actions;
        //     this.dialog.open(ViewRoleComponent, {
        //       data: {
        //         actions: action
        //       }
        //     });
        //   })

    }

}
