import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../../@fuse/components/alert';
import {UserStatus} from '../../../../shared/types/user-status.type';
import {RoleResponse} from '../../../../interfaces/responses/role-response.interface';
import {DataActionChecked} from '../../../../interfaces/data/data-action-checked.interface';
import {ActionService} from '../../../../services/action-service.service';
import {UserService} from '../../../../services/user-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoleService} from '../../../../services/role-service.service';
import {MatSelectChange} from '@angular/material/select';
import {Action} from '../../../../interfaces/action.interface';
import {UserResponse} from '../../../../interfaces/responses/user-response.interface';

@Component({
    selector: 'edit-user',
    templateUrl: './edit-user.component.html',
    animations: FuseAnimations
})
export class EditUserComponent implements OnInit {
    @ViewChild('editUserNgForm') editUserNgForm: NgForm;

    showAlert: boolean = false;
    editUserForm: FormGroup;
    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };
    userStatuses: UserStatus[] = ['ENABLED', 'DISABLED', 'RESTORE_PASSWORD'];
    roles: RoleResponse[] = [];
    actionsChecked: DataActionChecked[] = [];


    constructor(private formBuilder: FormBuilder, private actionService: ActionService, private userService: UserService,
                @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<EditUserComponent>,
                private roleService: RoleService) {
    }

    ngOnInit(): void {

        this.editUserForm = this.formBuilder.group({
            username: ['', Validators.required],
            status: ['ENABLED', Validators.required],
            names: ['', Validators.required],
            firstSurname: ['', Validators.required],
            secondSurname: [''],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            identificationNumber: ['', Validators.required]
        });

        const userId: number = this.data.userId;
        console.log(userId);
        this.userService.getUserActionByUserId(userId).subscribe((response) => {
            const user: UserResponse = response.data.user;
            console.log(user);
            this.editUserForm.patchValue({
                username: user.username,
                status: user.status,
                names: user.names,
                firstSurname: user.firstSurname,
                secondSurname: user.secondSurname,
                email: user.email,
                phone: user.phone,
                identificationNumber: user.identificationNumber
            });
        });

        // this.roleService.getAllRoles().subscribe((response) => {
        //     this.roles = response.data;
        // });

    }

    registerNewUser(): void {
        // if (this.editUserForm.invalid) {
        //     return;
        // }
        // this.editUserForm.disable();
        // this.showAlert = false;
        // const userRequest: UserRequest = {
        //     username: this.editUserForm.value.username,
        //     password: this.editUserForm.value.password,
        //     passwordConfirmation: this.editUserForm.value.passwordConfirmation,
        //     status: this.editUserForm.value.status,
        //     names: this.editUserForm.value.names,
        //     firstSurname: this.editUserForm.value.firstSurname,
        //     secondSurname: this.editUserForm.value.secondSurname,
        //     email: this.editUserForm.value.email,
        //     phone: this.editUserForm.value.phone,
        //     identificationNumber: this.editUserForm.value.identificationNumber
        //
        // };
        // const actionsId: number[] = this.getActionsIdChecked();
        // const completeUserRequest: CompleteUserRequest = {
        //     user: userRequest,
        //     actionsId: actionsId
        // };
        // this.userService.registerUser(completeUserRequest).subscribe((response) => {
        //     this.editUserForm.enable();
        //     this.editUserNgForm.resetForm();
        //     const message: string = response.message;
        //     const data: UserActionResponse = response.data;
        //     if (response.success) {
        //         // this.toaster.success(message, data, 'Usuarios');
        //         this.data.onUserCreated();
        //         this.dialogRef.close();
        //         // return;
        //     } else {
        //         this.alert = {
        //             type: 'error',
        //             message: message
        //         };
        //         this.showAlert = true;
        //
        //     }
        //     // this.toaster.error(message, data, 'Usuarios');
        //
        // });

    }

    private getActionsIdChecked(): number[] {
        const actionsId: number[] = [];
        for (const actionChecked of this.actionsChecked) {
            if (actionChecked.isChecked === true) {
                actionsId.push(actionChecked.action.id);
            }
        }
        return actionsId;
    }

    onSelectRole(event: MatSelectChange): void {
        this.purgeUncheckedActions();
        const roleId: number = event.value;
        this.roleService.getRoleActionsByRoleId(roleId).subscribe((response) => {
            const actions: Action[] = response.data.actions;
            for (const action of actions) {
                let containAction: boolean = false;
                for (const actionChecked of this.actionsChecked) {
                    if (actionChecked.action.id === action.id) {
                        containAction = true;
                        break;
                    }
                }
                if (containAction === false) {
                    const actionChecked: DataActionChecked = {
                        action: action,
                        isChecked: false
                    };
                    this.actionsChecked.push(actionChecked);
                }
            }
        });
    }

    private purgeUncheckedActions(): void {
        const userActionChecked: DataActionChecked[] = [];
        for (const actionChecked of this.actionsChecked) {
            if (actionChecked.isChecked === true) {
                userActionChecked.push(actionChecked);
            }
        }
        this.actionsChecked = userActionChecked;
    }

    checkAction(event, actionId: number): void {
        for (const actionChecked of this.actionsChecked) {
            if (actionChecked.action.id === actionId) {
                actionChecked.isChecked = !!event.checked;
            }
        }
    }

}
