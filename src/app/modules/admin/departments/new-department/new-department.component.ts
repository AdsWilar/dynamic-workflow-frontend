import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../../@fuse/components/alert';
import {DepartmentStatuses} from '../../../../shared/constants';
import {DepartmentStatus} from '../../../../shared/types/department-status.type';
import {UserService} from '../../../../services/user-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Toaster} from '../../../../shared/toaster';
import {UserResponse} from '../../../../interfaces/responses/user-response.interface';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../services/department-service.service';
import {MatSelectChange} from '@angular/material/select';
import {DepartmentRequest} from '../../../../interfaces/requests/department-request.interface';
import {CompleteDepartmentRequest} from '../../../../interfaces/requests/complete-department-request.interface';
import {CompleteDepartmentResponse} from '../../../../interfaces/responses/complete-department-response.interface';
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
    selector: 'new-department',
    templateUrl: './new-department.component.html',
    animations: FuseAnimations
})
export class NewDepartmentComponent implements OnInit {

    @ViewChild('newDepartmentNgForm') newDepartmentNgForm: NgForm;
    showAlert: boolean = false;
    newDepartmentForm: FormGroup;
    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };
    departmentStatuses: DepartmentStatus[] = DepartmentStatuses;
    departments: DepartmentResponse[] = [];
    nonDepartmentBosses: UserResponse[] = [];
    nonDepartmentMembers: UserResponse[] = [];
    filteredNonDepartmentMembers: UserResponse[] = [];
    selectedNonDepartmentMembers: UserResponse[] = [];


    constructor(private formBuilder: FormBuilder, private departmentService: DepartmentService,
                private userService: UserService, @Inject(MAT_DIALOG_DATA) private data: any,
                private dialogRef: MatDialogRef<NewDepartmentComponent>, private toaster: Toaster) {
    }

    ngOnInit(): void {
        this.newDepartmentForm = this.formBuilder.group({
            name: ['', Validators.required],
            contactEmail: ['', [Validators.required, Validators.email]],
            contactPhone: ['', Validators.required],
            location: ['', Validators.required],
            status: ['ENABLED', Validators.required],
            parentDepartmentId: [''],
            departmentBossId: ['', Validators.required]
        });
        this.departmentService.getAllDepartmentsForCurrentUser()
            .subscribe((response) => {
                this.departments = response.data;
            });
        this.userService.getNonDepartmentBosses().subscribe((response) => {
            this.nonDepartmentBosses = response.data;
        });
        this.userService.getNonDepartmentMembers().subscribe((response) => {
            this.nonDepartmentMembers = response.data;
            this.filteredNonDepartmentMembers = response.data;
        });
    }

    onSelectDepartmentBoss(event: MatSelectChange): void {
        this.userService.getNonDepartmentMembers().subscribe((response) => {
            const currentNonDepartmentMembers: UserResponse[] = response.data;
            const selectedDepartmentBossId: number = event.value;
            const nonDepartmentMembers: UserResponse[] = [];
            for (const nonDepartmentMember of currentNonDepartmentMembers) {
                if (nonDepartmentMember.id !== selectedDepartmentBossId) {
                    nonDepartmentMembers.push(nonDepartmentMember);
                }
            }
            this.filteredNonDepartmentMembers = nonDepartmentMembers;
        });
    }

    filterNonDepartmentMembers(event): void {
        const value = event.target.value.toLowerCase();
        const filteredNonDepartmentMembers: UserResponse[] = [];
        for (const nonDepartmentMember of this.nonDepartmentMembers) {
            if (nonDepartmentMember.username.toLowerCase().includes(value) ||
                nonDepartmentMember.names.toLowerCase().includes(value) ||
                nonDepartmentMember.firstSurname.toLowerCase().includes(value) ||
                nonDepartmentMember.secondSurname.toLowerCase().includes(value)) {
                filteredNonDepartmentMembers.push(nonDepartmentMember);
            }
        }
        this.filteredNonDepartmentMembers = filteredNonDepartmentMembers;
    }

    nonDepartmentMemberIsSelected(nonDepartmentMemberId: number): boolean {
        for (const selectedNonDepartmentMember of this.selectedNonDepartmentMembers) {
            if (selectedNonDepartmentMember.id === nonDepartmentMemberId) {
                return true;
            }
        }
        return false;
    }

    toggleNonDepartmentMember(nonDepartmentMember: UserResponse, change: MatCheckboxChange): void {
        if (change.checked) {
            this.selectedNonDepartmentMembers.push(nonDepartmentMember);
            return;
        }
        this.selectedNonDepartmentMembers
            .splice(
                this.selectedNonDepartmentMembers
                    .findIndex(selectedNonDepartmentMember =>
                        selectedNonDepartmentMember.id === nonDepartmentMember.id),
                1
            );
    }

    registerNewDepartment(): void {
        if (this.newDepartmentForm.invalid) {
            return;
        }
        this.newDepartmentForm.disable();
        this.showAlert = false;
        const departmentRequest: DepartmentRequest = {
            name: this.newDepartmentForm.value.name,
            contactEmail: this.newDepartmentForm.value.contactEmail,
            contactPhone: this.newDepartmentForm.value.contactPhone,
            location: this.newDepartmentForm.value.location,
            status: this.newDepartmentForm.value.status,
            parentDepartmentId: this.newDepartmentForm.value.parentDepartmentId
        };
        const analystMembersId: number[] = this.getAnalystMembersId();
        const completeDepartmentRequest: CompleteDepartmentRequest = {
            department: departmentRequest,
            departmentBossId: this.newDepartmentForm.value.departmentBossId,
            analystMembersId: analystMembersId
        };
        this.departmentService.registerCompleteDepartment(completeDepartmentRequest)
            .subscribe((response) => {
                this.newDepartmentForm.enable();
                this.newDepartmentNgForm.resetForm();
                const message: string = response.message;
                const data: CompleteDepartmentResponse = response.data;
                if (response.success) {
                    // this.toaster.success(message, data, 'Usuarios');
                    this.data.onDepartmentCreated();
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

    getAnalystMembersId(): number[] {
        const analystMembersId: number[] = [];
        for (const selectedNonDepartmentMember of this.selectedNonDepartmentMembers) {
            analystMembersId.push(selectedNonDepartmentMember.id);
        }
        return analystMembersId;
    }

}
