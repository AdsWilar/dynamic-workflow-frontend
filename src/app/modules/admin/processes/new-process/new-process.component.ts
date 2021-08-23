import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {FuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProcessStatus} from '../../../../shared/types/process-status.type';
import {ProcessStatuses} from '../../../../shared/constant';
import {DepartmentResponse} from '../../../../interfaces/responses/department-response.interface';
import {DepartmentService} from '../../../../services/department-service.service';
import {DynamicInputComponent} from './dynamic-input/dynamic-input.component';
import {StageComponent} from './stage/stage.component';
import {ProcessRequest} from '../../../../interfaces/requests/process-request.interface';
import {InputRequest} from '../../../../interfaces/requests/input-request.interface';
import {SelectionInputValueRequest} from '../../../../interfaces/requests/selection-input-value-request.interface';
import {StageRequest} from '../../../../interfaces/requests/stage-request.interface';
import {StageAnalystRequest} from '../../../../interfaces/requests/stage-analyst-request.interface';
import {DataChecked} from '../../../../interfaces/data/data-checked.interface';
import {DepartmentMember} from '../../../../interfaces/department-member.interface';
import {CompleteProcessRequest} from '../../../../interfaces/requests/complete-process-request.interface';
import {ProcessService} from '../../../../services/process-service.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'new-processes',
    templateUrl: './new-process.component.html',
    styleUrls: ['./new-process.component.scss'],
    animations: FuseAnimations
})
export class NewProcessComponent implements OnInit {

    newProcessWizardForm: FormGroup;
    processStatuses: ProcessStatus[];
    departments: DepartmentResponse[];
    availableDepartmentsForStage: DepartmentResponse[];
    processesTitle: string;

    isFirstTimeInProcessForm: boolean = true;
    isFirstTimeInStageForm: boolean = true;

    @ViewChild('inputContainerRef', {static: true, read: ViewContainerRef}) inputContainerRef: ViewContainerRef;
    inputComponentsRef: ComponentRef<DynamicInputComponent>[] = [];

    @ViewChild('stageContainerRef', {static: true, read: ViewContainerRef}) stageContainerRef: ViewContainerRef;
    stageComponentsRef: ComponentRef<StageComponent>[] = [];

    constructor(private formBuilder: FormBuilder, private departmentService: DepartmentService,
                private componentFactoryResolver: ComponentFactoryResolver, private processService: ProcessService,
                private router: Router, private toaster: ToastrService) {
        this.processStatuses = ProcessStatuses;
        this.departments = [];
        this.availableDepartmentsForStage = [];
        this.processesTitle = 'Procesos';
    }

    ngOnInit(): void {
        this.newProcessWizardForm = this.formBuilder.group({
            generalInfo: this.formBuilder.group({
                name: [null, Validators.required],
                description: [null],
                status: ['ACTIVE', Validators.required],
                departmentId: [null, Validators.required]
            }),
            processForm: this.formBuilder.group({}),
            stageForm: this.formBuilder.group({})
        });

        this.departmentService.getAllDepartmentsForCurrentUser()
            .subscribe((response) => {
                this.departments = response.data;
            });
    }

    onSelectDepartment(): void {
        this.isFirstTimeInStageForm = true;
        const departmentId: number = this.newProcessWizardForm.get('generalInfo.departmentId').value;
        this.departmentService.getDepartmentWithDescendantsById(departmentId)
            .subscribe((response) => {
                this.availableDepartmentsForStage = response.data;
            });
    }

    prepareForNextSteps(): void {
        if (this.isFirstTimeInProcessForm) {
            this.initializeInputs();
            this.isFirstTimeInProcessForm = false;
        }
        if (this.isFirstTimeInStageForm) {
            this.initializeStages();
            this.isFirstTimeInStageForm = false;
        }
    }

    private initializeInputs(): void {
        this.inputComponentsRef = [];
        const inputComponentRef: ComponentRef<DynamicInputComponent> = this.createInputComponentRef();
        const inputComponent: DynamicInputComponent = inputComponentRef.instance;
        inputComponent.index = 1;
        inputComponent.removeInput = this.removeInput;
        this.inputComponentsRef.push(inputComponentRef);
    }

    private createInputComponentRef(): ComponentRef<DynamicInputComponent> {
        const inputComponentFactory: ComponentFactory<DynamicInputComponent> =
            this.componentFactoryResolver.resolveComponentFactory(DynamicInputComponent);
        return this.inputContainerRef.createComponent(inputComponentFactory);
    }

    removeInput = (index: number): void => {
        if (this.inputContainerRef.length < 2) {
            this.toaster.warning(
                'Se debe tener al menos una entrada para el formulario del proceso.',
                this.processesTitle
            );
            return;
        }

        const inputComponentRef: ComponentRef<DynamicInputComponent> =
            this.inputComponentsRef.filter(x => x.instance.index === index)[0];
        const inputRefIndex: number = this.inputContainerRef.indexOf(inputComponentRef.hostView);
        this.inputContainerRef.remove(inputRefIndex);
        this.inputComponentsRef = this.inputComponentsRef.filter(x => x.instance.index !== index);
    }

    private initializeStages(): void {
        this.stageComponentsRef = [];
        const stageComponentRef: ComponentRef<StageComponent> = this.createStageComponentRef();
        const stageComponent: StageComponent = stageComponentRef.instance;
        stageComponent.index = 1;
        stageComponent.removeStage = this.removeStage;
        stageComponent.availableDepartmentsForStage = this.availableDepartmentsForStage;
        this.stageComponentsRef.push(stageComponentRef);
    }

    private createStageComponentRef(): ComponentRef<StageComponent> {
        const stageComponentFactory: ComponentFactory<StageComponent> =
            this.componentFactoryResolver.resolveComponentFactory(StageComponent);
        return this.stageContainerRef.createComponent(stageComponentFactory);
    }

    removeStage = (index: number): void => {
        if (this.stageContainerRef.length < 2) {
            this.toaster.warning('Se debe tener al menos una etapa para el proceso.', this.processesTitle);
            return;
        }

        const stageComponentRef: ComponentRef<StageComponent> =
            this.stageComponentsRef.filter(x => x.instance.index === index)[0];
        const stageRefIndex: number = this.stageContainerRef.indexOf(stageComponentRef.hostView);
        this.stageContainerRef.remove(stageRefIndex);
        this.stageComponentsRef = this.stageComponentsRef.filter(x => x.instance.index !== index);
    }

    addInput(): void {
        const lastInputComponentRef: ComponentRef<DynamicInputComponent> =
            this.inputComponentsRef[this.inputComponentsRef.length - 1];
        const lastInputComponent: DynamicInputComponent = lastInputComponentRef.instance;
        const nextIndex: number = lastInputComponent.index + 1;

        const newInputComponentRef: ComponentRef<DynamicInputComponent> = this.createInputComponentRef();
        const newInputComponent: DynamicInputComponent = newInputComponentRef.instance;
        newInputComponent.index = nextIndex;
        newInputComponent.removeInput = this.removeInput;

        this.inputComponentsRef.push(newInputComponentRef);
    }

    addStage(): void {
        const lastStageComponentRef: ComponentRef<StageComponent> =
            this.stageComponentsRef[this.stageComponentsRef.length - 1];
        const lastStageComponent: StageComponent = lastStageComponentRef.instance;
        const nextIndex: number = lastStageComponent.index + 1;

        const newStageComponentRef: ComponentRef<StageComponent> = this.createStageComponentRef();
        const newStageComponent: StageComponent = newStageComponentRef.instance;
        newStageComponent.index = nextIndex;
        newStageComponent.removeStage = this.removeStage;
        newStageComponent.availableDepartmentsForStage = this.availableDepartmentsForStage;

        this.stageComponentsRef.push(newStageComponentRef);
    }

    createProcess(): void {
        const processRequest: ProcessRequest = {
            name: this.newProcessWizardForm.get('generalInfo.name').value,
            description: this.newProcessWizardForm.get('generalInfo.description').value,
            status: this.newProcessWizardForm.get('generalInfo.status').value,
            departmentId: this.newProcessWizardForm.get('generalInfo.departmentId').value
        };
        const inputs: InputRequest[] = this.getInputs();
        const stages: StageRequest[] = this.getStages();
        const completeProcessRequest: CompleteProcessRequest = {
            process: processRequest,
            inputs: inputs,
            stages: stages
        };
        this.processService.createProcess(completeProcessRequest)
            .subscribe((response) => {
                const message: string = response.message;
                if (response.success) {
                    this.toaster.success(message, this.processesTitle);
                    this.router.navigate(['processes']);
                } else {
                    this.toaster.error(message, this.processesTitle);
                }
            });
    }

    private getInputs(): InputRequest[] {
        const inputs: InputRequest[] = [];
        for (const inputComponentRef of this.inputComponentsRef) {
            const inputComponent: DynamicInputComponent = inputComponentRef.instance;
            const inputRequest: InputRequest = {
                name: inputComponent.getTitle(),
                description: inputComponent.getDescription(),
                isMandatory: true,
                inputTypeId: inputComponent.getInputTypeSelected().id
            };
            if (inputComponent.isInputTypeWithOptionValues()) {
                inputRequest.selectionValues = this.getSelectionValues(inputComponent);
            }
            inputs.push(inputRequest);
        }
        return inputs;
    }

    private getSelectionValues(inputComponent: DynamicInputComponent): SelectionInputValueRequest[] {
        const options: string[] = inputComponent.options;
        const selectionValues: SelectionInputValueRequest[] = [];
        for (const option of options) {
            const selectionInputValueRequest: SelectionInputValueRequest = {
                value: option
            };
            selectionValues.push(selectionInputValueRequest);
        }
        return selectionValues;
    }

    private getStages(): StageRequest[] {
        const stages: StageRequest[] = [];
        const length: number = this.stageComponentsRef.length;
        for (let index = 0; index < length; index++) {
            const stageComponent: StageComponent = this.stageComponentsRef[index].instance;
            const analysts: StageAnalystRequest[] = this.getAnalysts(stageComponent);
            const stageIndex: number = index + 1;
            const stageRequest: StageRequest = {
                name: stageComponent.getName(),
                description: stageComponent.getDescription(),
                approvalsRequired: analysts.length,
                stageIndex: stageIndex,
                analysts: analysts
            };
            if (stageIndex > 1) {
                stageRequest.previousStageIndex = stageIndex - 1;
            }
            if (stageIndex < length) {
                stageRequest.nextStageIndex = stageIndex + 1;
            }
            stages.push(stageRequest);
        }
        return stages;
    }

    private getAnalysts(stageComponent: StageComponent): StageAnalystRequest[] {
        const departmentMembersChecked: DataChecked<DepartmentMember>[] = stageComponent.departmentMembersChecked;
        const analysts: StageAnalystRequest[] = [];
        for (const departmentMemberChecked of departmentMembersChecked) {
            if (departmentMemberChecked.isChecked) {
                const stageAnalystRequest: StageAnalystRequest = {
                    requiresApproval: true,
                    approvalIsMandatory: true,
                    departmentMemberId: departmentMemberChecked.data.id
                };
                analysts.push(stageAnalystRequest);
            }
        }
        return analysts;
    }

}
