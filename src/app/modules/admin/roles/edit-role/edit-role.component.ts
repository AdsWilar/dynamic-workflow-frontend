import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../../@fuse/components/alert';
import {Action} from '../../../../interfaces/action.interface';
import {ActionService} from '../../../../services/action-service.service';
import {RoleService} from '../../../../services/role-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoleRequest} from '../../../../interfaces/requests/role-request.interface';
import {CompleteRoleRequest} from '../../../../interfaces/requests/complete-role-request.interface';
import {RoleResponse} from '../../../../interfaces/responses/role-response.interface';
import {DataActionChecked} from '../../../../interfaces/data/data-action-checked.interface';

@Component({
    selector: 'edit-role',
    templateUrl: './edit-role.component.html',
    animations: FuseAnimations
})
export class EditRoleComponent implements OnInit {
    @ViewChild('editRoleNgForm') editRoleNgForm: NgForm;

    showAlert: boolean = false;
    editRoleForm: FormGroup;
    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };
    actionsChecked: DataActionChecked[] = [];


    constructor(private formBuilder: FormBuilder, private actionService: ActionService, private roleService: RoleService,
                @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<EditRoleComponent>) {
    }

    ngOnInit(): void {
        this.editRoleForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });
        const roleId: number = this.data.roleId;
        this.roleService.getRoleActionsByRoleId(roleId).subscribe((response) => {
            const role: RoleResponse = response.data.role;
            this.editRoleForm.patchValue({
                name: role.name,
                description: role.description
            });
            this.loadActionsChecked(response.data.actions);
            this.loadMissingActions();
        });

    }

    private loadActionsChecked(actions: Action[]): void {
        for (const action of actions) {
            const actionChecked: DataActionChecked = {
                action: action,
                isChecked: true
            };
            this.actionsChecked.push(actionChecked);
        }
    }

    private loadMissingActions(): void {
        this.actionService.getAllActions().subscribe((response) => {
            const actions: Action[] = response.data;
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


    editNewRole(): void {
        if (this.editRoleForm.invalid) {
            return;
        }
        this.editRoleForm.disable();
        this.showAlert = false;

        const roleRequest: RoleRequest = {
            name: this.editRoleForm.value.name,
            description: this.editRoleForm.value.description
        };

        const actionsId: number[] = this.getActionsIdChecked();
        const completeRoleRequest: CompleteRoleRequest = {
            role: roleRequest,
            actionsId: actionsId
        };

        this.roleService.updateRole(completeRoleRequest, this.data.roleId).subscribe((response) => {
            this.editRoleForm.enable();
            this.editRoleNgForm.resetForm();
            if (response.success) {
                this.data.onRoleEdited();
                this.dialogRef.close();
            } else {
                this.alert = {
                    type: 'error',
                    message: response.message
                };
                this.showAlert = true;
            }
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

    checkAction(event, actionId: number): void {
        for (const actionChecked of this.actionsChecked) {
            if (actionChecked.action.id === actionId) {
                actionChecked.isChecked = !!event.checked;
            }
        }
    }

    thereIsNoActionChecked(): boolean {
        for (const actionChecked of this.actionsChecked) {
            if (actionChecked.isChecked === true) {
                return false;
            }
        }
        return true;
    }

}
