import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {DepartmentResponse} from '../../../../../interfaces/responses/department-response.interface';
import {DataChecked} from '../../../../../interfaces/data/data-checked.interface';
import {DepartmentMember} from '../../../../../interfaces/department-member.interface';
import {DepartmentService} from '../../../../../services/department-service.service';
import {DepartmentMemberService} from "../../../../../services/department-member-service.service";

@Component({
    selector: 'stage',
    templateUrl: './stage.component.html',
    styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

    public index: number;
    public removeStage: (index: number) => void;
    public availableDepartmentsForStage: DepartmentResponse[];

    stageForm: FormGroup;

    departmentMembersChecked: DataChecked<DepartmentMember>[] = [];

    constructor(private formBuilder: FormBuilder, private departmentMemberService: DepartmentMemberService) {
    }

    ngOnInit(): void {
        this.stageForm = this.formBuilder.group({
            name: [null, Validators.required],
            description: [null]
        });
    }

    onSelectDepartment(event: MatSelectChange): void {
        this.purgeUncheckedDepartmentMembers();
        const departmentId: number = event.value;
        this.departmentMemberService.getAllDepartmentMembersByDepartmentId(departmentId)
            .subscribe((response) => {
                const departmentMembers: DepartmentMember[] = response.data;
                for (const departmentMember of departmentMembers) {
                    let containAction: boolean = false;
                    for (const departmentMemberChecked of this.departmentMembersChecked) {
                        if (departmentMemberChecked.data.id === departmentMember.id) {
                            containAction = true;
                            break;
                        }
                    }
                    if (containAction === false) {
                        const departmentMemberChecked: DataChecked<DepartmentMember> = {
                            data: departmentMember,
                            isChecked: false
                        };
                        this.departmentMembersChecked.push(departmentMemberChecked);
                    }
                }
            });
    }

    private purgeUncheckedDepartmentMembers(): void {
        const departmentMembersChecked: DataChecked<DepartmentMember>[] = [];
        for (const departmentMemberChecked of this.departmentMembersChecked) {
            if (departmentMemberChecked.isChecked === true) {
                departmentMembersChecked.push(departmentMemberChecked);
            }
        }
        this.departmentMembersChecked = departmentMembersChecked;
    }

    checkDepartmentMember(event, departmentMemberId: number): void {
        for (const departmentMemberChecked of this.departmentMembersChecked) {
            if (departmentMemberChecked.data.id === departmentMemberId) {
                departmentMemberChecked.isChecked = !!event.checked;
            }
        }
    }

    removeMe(): void {
        this.removeStage(this.index);
    }

    getName(): string {
        return this.stageForm.value.name;
    }

    getDescription(): string {
        return this.stageForm.value.description;
    }

}
