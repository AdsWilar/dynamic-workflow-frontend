import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../../@fuse/components/alert';
import {DepartmentStatus} from '../../../../shared/types/department-status.type';
import {DepartmentStatuses} from '../../../../shared/constant';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {UserResponse} from '../../../../interfaces/responses/user-response.interface';
import {DepartmentService} from '../../../../services/department-service.service';
import {UserService} from '../../../../services/user-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Toaster} from '../../../../shared/toaster';
import {MatSelectChange} from '@angular/material/select';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {DepartmentRequest} from '../../../../interfaces/requests/department-request.interface';
import {CompleteDepartmentRequest} from '../../../../interfaces/requests/complete-department-request.interface';
import {CompleteDepartmentResponse} from '../../../../interfaces/responses/complete-department-response.interface';

@Component({
    selector: 'edit-department',
    templateUrl: './edit-department.component.html',
    animations: FuseAnimations
})
export class EditDepartmentComponent implements OnInit {

    @ViewChild('editDepartmentNgForm') editDepartmentNgForm: NgForm;
    showAlert: boolean = false;
    editDepartmentForm: FormGroup;
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
                private dialogRef: MatDialogRef<EditDepartmentComponent>) {
    }

    ngOnInit(): void {
        this.editDepartmentForm = this.formBuilder.group({
            name: ['', Validators.required],
            contactEmail: ['', [Validators.required, Validators.email]],
            contactPhone: ['', Validators.required],
            location: ['', Validators.required],
            status: ['ENABLED', Validators.required],
            parentDepartmentId: [''],
        });
        const depId: number = this.data.departmentId;
        this.departmentService.getCompleteDepartmentById(depId).subscribe((response) => {
            const department: DepartmentResponse = response.data.department;
            this.editDepartmentForm.patchValue({
                name: department.name,
                contactEmail: department.contactEmail,
                contactPhone: department.contactPhone,
                location: department.location,
                status: department.status,
                parentDepartmentId: department.parentDepartmentId,
            });
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

    editDepartment(): void {
        if (this.editDepartmentForm.invalid) {
            return;
        }
        this.editDepartmentForm.disable();
        this.showAlert = false;
        const departmentRequest: DepartmentRequest = {
            name: this.editDepartmentForm.value.name,
            contactEmail: this.editDepartmentForm.value.contactEmail,
            contactPhone: this.editDepartmentForm.value.contactPhone,
            location: this.editDepartmentForm.value.location,
            status: this.editDepartmentForm.value.status,
            parentDepartmentId: this.editDepartmentForm.value.parentDepartmentId
        };
        const analystMembersId: number[] = this.getAnalystMembersId();
        const completeDepartmentRequest: CompleteDepartmentRequest = {
            department: departmentRequest,
            departmentBossId: this.editDepartmentForm.value.departmentBossId,
            analystMembersId: analystMembersId
        };
        this.departmentService.registerCompleteDepartment (completeDepartmentRequest)
            .subscribe((response) => {
                this.editDepartmentForm.enable();
                this.editDepartmentNgForm.resetForm();
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
