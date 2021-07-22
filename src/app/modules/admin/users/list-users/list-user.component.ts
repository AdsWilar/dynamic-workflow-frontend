import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserResponse } from 'app/interfaces/responses/user-response.interface';
import { UserService } from 'app/services/user-service.service';

@Component({
    selector: 'list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss']
  })
  export class ListUserComponent implements OnInit {
    displayedColumns: string[] = ['username', 'name', 'firstSurname', 'secondSurname', 'email', 'actions', 'options'];
    @Input()
    users: UserResponse[];

    constructor(private router: Router, private dialog: MatDialog, private userService: UserService) {

    }

    ngOnInit(): void {

    }



    onGoToEdit(item: any): void {
      this.router.navigate(['role/edit']);
    }
    onGoToDelete(item: any): void {
      alert('Eliminardo');
    }


    onGoToView(): void {
     // this.dialog.open(ViewRoleComponent);
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
