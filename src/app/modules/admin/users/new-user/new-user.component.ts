import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../../@fuse/components/alert';
import {Action} from '../../../../interfaces/action.interface';
import {ActionService} from '../../../../services/action-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../../services/user-service.service';
import {UserRequest} from '../../../../interfaces/requests/user-request.interface';
import {CompleteUserRequest} from '../../../../interfaces/requests/complete-user-request.interface';
import {UserStatus} from '../../../../shared/types/user-status.type';
import {RoleResponse} from '../../../../interfaces/responses/role-response.interface';
import {RoleService} from '../../../../services/role-service.service';
import {MatSelectChange} from '@angular/material/select';
import {DataActionChecked} from '../../../../interfaces/data/data-action-checked.interface';
import {Toaster} from '../../../../shared/toaster';
import {UserActionResponse} from '../../../../interfaces/responses/user-action-response.interface';

@Component({
    selector: 'new-user',
    templateUrl: './new-user.component.html',
    animations: FuseAnimations
})
export class NewUserComponent implements OnInit {
    @ViewChild('newUserNgForm') newUserNgForm: NgForm;
    @Input()
    onUserCreated: void;
    showAlert: boolean = false;
    newUserForm: FormGroup;
    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };
    userStatuses: UserStatus[] = ['ENABLED', 'DISABLED', 'RESTORE_PASSWORD'];
    roles: RoleResponse[] = [];
    actionsChecked: DataActionChecked[] = [];


    constructor(private formBuilder: FormBuilder, private actionService: ActionService, private userService: UserService,
                @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<NewUserComponent>,
                private roleService: RoleService, private toaster: Toaster) {
    }

    ngOnInit(): void {

        this.newUserForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirmation: ['', Validators.required],
            status: ['ENABLED', Validators.required],
            names: ['', Validators.required],
            firstSurname: ['', Validators.required],
            secondSurname: [''],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            identificationNumber: ['', Validators.required]
        });

        this.roleService.getAllRoles().subscribe((response) => {
            this.roles = response.data;
        });

    }

    registerNewUser(): void {
        if (this.newUserForm.invalid) {
            return;
        }
        this.newUserForm.disable();
        this.showAlert = false;
        const userRequest: UserRequest = {
            username: this.newUserForm.value.username,
            password: this.newUserForm.value.password,
            passwordConfirmation: this.newUserForm.value.passwordConfirmation,
            status: this.newUserForm.value.status,
            names: this.newUserForm.value.names,
            firstSurname: this.newUserForm.value.firstSurname,
            secondSurname: this.newUserForm.value.secondSurname,
            email: this.newUserForm.value.email,
            phone: this.newUserForm.value.phone,
            identificationNumber: this.newUserForm.value.identificationNumber

        };
        const actionsId: number[] = this.getActionsIdChecked();
        const completeUserRequest: CompleteUserRequest = {
            user: userRequest,
            actionsId: actionsId
        };
        this.userService.registerUser(completeUserRequest).subscribe((response) => {
            this.newUserForm.enable();
            this.newUserNgForm.resetForm();
            const message: string = response.message;
            const data: UserActionResponse = response.data;
            if (response.success) {
                // this.toaster.success(message, data, 'Usuarios');
                this.data.onUserCreated();
                this.dialogRef.close();
                // return;
            } else {
                this.alert = {
                    type: 'error',
                    message: message
                };
                this.showAlert = true;

            }
            // this.toaster.error(message, data, 'Usuarios');

        });

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
