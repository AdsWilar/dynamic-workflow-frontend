import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../services/department-service.service';
import {EditDepartmentComponent} from '../edit-department/edit-department.component';
import {DepartmentMemberComponent} from '../department-member/department-member.component';
import {EditDepartmentMemberComponent} from '../edit-department-member/edit-department-member.component';
import {CompleteDepartmentResponse} from '../../../../interfaces/responses/complete-department-response.interface';
import {DepartmentMember} from '../../../../interfaces/department-member.interface';


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
                this.departmentService.getCompleteDepartmentById(this.departmentId)
                    .subscribe((response) => {
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
                departmentId: Id
            }
        });
    }

    openDepartmentMemberDialog(departmentMember: DepartmentMember): void {
        this.dialog.open(DepartmentMemberComponent, {
            data: {
                departmentMember: departmentMember
            }
        });
    }

    openEditMemberDepartmentDialog(): void {
        this.dialog.open(EditDepartmentMemberComponent, {
            data: {
                completeDepartment: this.completeDepartment
            }
        });
    }

}
