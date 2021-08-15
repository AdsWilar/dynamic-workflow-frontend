import {Component, Inject, Input, OnInit} from '@angular/core';
import {UserResponse} from '../../../../interfaces/responses/user-response.interface';
import {Action} from '../../../../interfaces/action.interface';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../../services/user-service.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../services/department-service.service';
import {DepartmentStatus} from '../../../../shared/types/department-status.type';
import {UserStatus} from '../../../../shared/types/user-status.type';
import {NewDepartmentComponent} from '../new-department/new-department.component';
import {EditDepartmentComponent} from '../edit-department/edit-department.component';
import {log} from 'util';
import {MemberDetailDepartmentComponent} from '../menbers-details-department/member-detail-department.component';
import {Style} from '@angular/cli/lib/config/schema';
import {EditDepartmentMemberComponent} from '../edit-department-member/edit-department-member.component';
import {CompleteDepartmentResponse} from '../../../../interfaces/responses/complete-department-response.interface';
import {DepartmentMember} from "../../../../interfaces/department-member.interface";


@Component({
    selector: 'view-department',
    templateUrl: './view-department.component.html',
    styleUrls: ['./view-department.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ViewDepartmentComponent implements OnInit {

    private subscription: Subscription;
    private departmentId: number;


    department: DepartmentResponse;
    departmentBoss: DepartmentMember;
    analystMembers: DepartmentMember[];

    completeDepartment: CompleteDepartmentResponse;


    displayedColumns: string[] = ['name', 'contactEmail', 'contactPhone', 'status', 'location'];

    constructor(private activatedRoute: ActivatedRoute, private departmentService: DepartmentService,
                private dialog: MatDialog) {
        this.department = {
            id: null,
            name: null,
            contactEmail: null,
            contactPhone: null,
            location: null,
            creationTimestamp: null,
            modificationTimestamp: null,
            status: null,
            parentDepartmentId: null,
            parentDepartment: null,
            subordinateDepartments: null
        };

        this.analystMembers = [];


    }

    ngOnInit(): void {
        this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('id') != null) {
                this.departmentId = +params.get('id');
                console.log(this.departmentId);
                this.departmentService.getCompleteDepartmentById(this.departmentId).subscribe((response) => {
                    this.completeDepartment = response.data;
                    this.department = response.data.department;
                    this.departmentBoss = response.data.departmentBoss;
                    this.analystMembers = response.data.analystMembers;
                });
            }
        });
    }


    openEditDepartmentDialog(Id: number): void {

        this.dialog.open(EditDepartmentComponent, {
            data: {
                departmentId: Id,

            }

        });
    }

    openDepartmentMemberDialog(departmentMember: DepartmentMember, isDepartmentBoss: boolean): void {
        if (isDepartmentBoss === true) {
            this.dialog.open(MemberDetailDepartmentComponent, {
                data: {
                    departmentMember: departmentMember,
                    isDepartmentBoss: isDepartmentBoss
                }

            });
        } else {
            this.dialog.open(MemberDetailDepartmentComponent, {
                data: {
                    departmentMember: departmentMember,
                    isDepartmentBoss: isDepartmentBoss
                }

            });
        }
    }

    openEditMemberDepartmentDialog(): void {

        this.dialog.open(EditDepartmentMemberComponent, {
            data: {
                completeDepartment: this.completeDepartment
            }
        });
    }
}
