import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProcessInputsResponse} from '../../../../../interfaces/responses/process-inputs-response.interface';
import {ProcessService} from '../../../../../services/process-service.service';
import {FormInputComponent} from './form-input/form-input.component';
import {NewRequestRequest} from "../../../../../interfaces/requests/new-request-request.interface";
import {RequestInputValueRequest} from "../../../../../interfaces/requests/request-input-value-request.interface";
import {RequestService} from "../../../../../services/request-service.service";

@Component({
    selector: 'new-process-request',
    templateUrl: './new-process-request.component.html',
    styleUrls: ['./new-process-request.component.scss']
})
export class NewProcessRequestComponent implements OnInit {

    private subscription: Subscription;
    private processId: number;
    processInputs: ProcessInputsResponse;
    departmentId: number;

    @ViewChild('formInputContainerRef', {static: true, read: ViewContainerRef}) formInputContainerRef: ViewContainerRef;
    formInputComponentsRef: ComponentRef<FormInputComponent>[] = [];

    constructor(private activatedRoute: ActivatedRoute, private processService: ProcessService,
                private componentFactoryResolver: ComponentFactoryResolver, private requestService: RequestService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('processId') != null) {
                this.processId = +params.get('processId');
                console.log(this.processId);
                this.processService.getProcessInputsByProcessId(this.processId)
                    .subscribe((response) => {
                        if (response.success) {
                            this.processInputs = response.data;
                            this.initializeFormInputs();
                        }
                    });
            }
            if (params.get('departmentId') != null) {
                this.departmentId = +params.get('departmentId');
            }
        });
    }

    initializeFormInputs(): void {
        for (const detailedInput of this.processInputs.detailedInputs) {
            const formInputComponentRef: ComponentRef<FormInputComponent> = this.createFormInputComponentRef();
            const formInputComponent: FormInputComponent = formInputComponentRef.instance;
            formInputComponent.detailedInput = detailedInput;
            this.formInputComponentsRef.push(formInputComponentRef);
        }
    }

    private createFormInputComponentRef(): ComponentRef<FormInputComponent> {
        const formInputComponentFactory: ComponentFactory<FormInputComponent> =
            this.componentFactoryResolver.resolveComponentFactory(FormInputComponent);
        return this.formInputContainerRef.createComponent(formInputComponentFactory);
    }

    registerRequest(): void {
        const inputValues: RequestInputValueRequest[] = this.getInputValues();
        const newRequestRequest: NewRequestRequest = {
            processId: this.processId,
            inputValues: inputValues
        };
        this.requestService.registerRequest(newRequestRequest)
            .subscribe((response) => {
                if (response.success) {
                    this.router.navigate(['requests/my-requests']);
                } else {
                    console.log(response.message);
                }
            });
    }

    private getInputValues(): RequestInputValueRequest[] {
        const inputValues: RequestInputValueRequest[] = [];
        for (const formInputComponentRef of this.formInputComponentsRef) {
            const formInputComponent: FormInputComponent = formInputComponentRef.instance;
            const inputValue: RequestInputValueRequest = {
                inputId: formInputComponent.detailedInput.input.id,
                value: formInputComponent.getInputValue()
            };
            inputValues.push(inputValue);
        }
        return inputValues;
    }

}
