import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '@fuse/components/alert';
import {Action} from 'app/interfaces/action.interface';
import {RoleRequest} from 'app/interfaces/requests/role-request.interface';
import {CompleteRoleRequest} from 'app/interfaces/requests/complete-role-request.interface';
import {ActionService} from 'app/services/action-service.service';
import {RoleService} from 'app/services/role-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'new-role',
    templateUrl: './new-role.component.html',
    animations: FuseAnimations
})
export class NewRoleComponent implements OnInit {
    @ViewChild('newRoleNgForm') newRoleNgForm: NgForm;
    showAlert: boolean = false;
    newRoleForm: FormGroup;
    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };
    actions: Action[] = [];
    actionsId: number[] = [];


    constructor(private formBuilder: FormBuilder, private actionService: ActionService, private roleService: RoleService,
                @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<NewRoleComponent>) {
    }

    ngOnInit(): void {
        this.newRoleForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });

        this.actionService.getAllActions().subscribe((response) => {
            this.actions = response.data;
            console.log(this.actions);
        });
    }

    registerNewRole(): void {
        if (this.newRoleForm.invalid) {
            return;
        }
        this.newRoleForm.disable();
        this.showAlert = false;
        const roleRequest: RoleRequest = {
            name: this.newRoleForm.value.name,
            description: this.newRoleForm.value.description
        };
        const completeRoleRequest: CompleteRoleRequest = {
            role: roleRequest,
            actionsId: this.actionsId
        };
        this.roleService.registerRole(completeRoleRequest).subscribe((response) => {
            console.log(response);
            this.newRoleForm.enable();
            this.newRoleNgForm.resetForm();
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
