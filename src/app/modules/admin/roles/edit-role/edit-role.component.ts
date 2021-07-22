import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../../@fuse/components/alert';
import {Action} from '../../../../interfaces/action.interface';
import {ActionService} from '../../../../services/action-service.service';
import {RoleService} from '../../../../services/role-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoleRequest} from '../../../../interfaces/requests/role-request.interface';
import {RoleWithActionsIdRequest} from '../../../../interfaces/requests/role-with-actions-id-request.interface';

@Component({
    selector: 'edit-role',
    templateUrl: './edit-role.component.html',
    animations: FuseAnimations
})
export class EditRoleComponent implements OnInit {
    @ViewChild('editRoleNgForm') editRoleNgForm: NgForm;
    @Input()
    onRoleCreated: void;
    showAlert: boolean = false;
    editRoleForm: FormGroup;
    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };
    actions: Action[] = [];
    actionsId: number[] = [];


    constructor(private formBuilder: FormBuilder, private actionService: ActionService, private roleService: RoleService,
                @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<EditRoleComponent>) {
    }

    ngOnInit(): void {

        this.editRoleForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });

        this.actionService.getAllActions().subscribe((response) => {
            this.actions = response.data;
            console.log(this.actions);
        });
    }

    registerNewRole(): void {
        if (this.editRoleForm.invalid) {
            return;
        }
        this.editRoleForm.disable();
        this.showAlert = false;
        const roleRequest: RoleRequest = {
            name: this.editRoleForm.value.name,
            description: this.editRoleForm.value.description
        };
        const roleWithActionsIdRequest: RoleWithActionsIdRequest = {
            role: roleRequest,
            actionsId: this.actionsId
        };
        this.roleService.registerRole(roleWithActionsIdRequest).subscribe((response) => {
            console.log(response);
            this.editRoleForm.enable();
            this.editRoleNgForm.resetForm();
            if (response.success) {
                this.data.onRoleCreated();
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

    checkAction(event, actionId: number): void {
        if (event.checked) {
            this.actionsId.push(actionId);
            return;
        }
        this.actionsId.forEach((value, index) => {
            if (value === actionId) {
                this.actionsId.splice(index, 1);
            }
        });
    }

}
