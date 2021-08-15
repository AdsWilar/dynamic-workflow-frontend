import {Component, Inject, OnInit} from '@angular/core';
import {RoleResponse} from '../../../../interfaces/responses/role-response.interface';
import {Action} from '../../../../interfaces/action.interface';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {RoleService} from '../../../../services/role-service.service';
import {DepartmentService} from '../../../../services/department-service.service';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {UserResponse} from '../../../../interfaces/responses/user-response.interface';
import {DepartmentMember} from '../../../../interfaces/department-member.interface';

@Component({
    selector: 'member-detail-department',
    templateUrl: './memberBoss-detail-department.component.html',
    styleUrls: ['./member-detail-department.component.scss']
})

export class MemberDetailDepartmentComponent implements OnInit {
    departmentMember: DepartmentMember;
    departmentMemberTitle: string = '';


    constructor(private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) private data: any) {
    }

    ngOnInit(): void {

        this.departmentMemberTitle = this.data.isDepartmentBoss ? 'Jefe de departamento' : 'Analista';
        this.departmentMember = this.data.departmentMember;

    }

}
