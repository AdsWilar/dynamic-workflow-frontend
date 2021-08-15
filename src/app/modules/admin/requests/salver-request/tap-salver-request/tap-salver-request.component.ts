import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {DepartmentResponse} from '../../../../../interfaces/responses/department-response.interface';
import {UserResponse} from '../../../../../interfaces/responses/user-response.interface';
import {CompleteDepartmentResponse} from '../../../../../interfaces/responses/complete-department-response.interface';
import {ActivatedRoute} from '@angular/router';
import {DepartmentService} from '../../../../../services/department-service.service';
import {MatDialog} from '@angular/material/dialog';
import {EditDepartmentComponent} from '../../../departments/edit-department/edit-department.component';
import {MemberDetailDepartmentComponent} from '../../../departments/menbers-details-department/member-detail-department.component';
import {EditDepartmentMemberComponent} from '../../../departments/edit-department-member/edit-department-member.component';

@Component({
    selector: 'tap-salver-request',
    templateUrl: './tap-salver-request.component.html',
    styleUrls: ['./tap-salver-request.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class TapSalverRequestComponent implements OnInit {

    private subscription: Subscription;
    private departmentId: number;


    constructor(private activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('id') != null) {
                this.departmentId = +params.get('id');
                console.log(this.departmentId);
            }
        });
    }
}
