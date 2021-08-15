import {Component, OnInit} from '@angular/core';
import {FuseAnimations} from '../../../../../../@fuse/animations';
import {InputType} from '../../../../../interfaces/input-type.interface';
import {InputTypeService} from '../../../../../services/input-type-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {NewOptionComponent} from './option/new-option.component';
import {MatTableDataSource} from '@angular/material/table';
import {EditOptionComponent} from './option/edit-option.component';
import {InputTypesWithOptionValues} from '../../../../../shared/constant';
import {InputTypeName} from '../../../../../shared/types/input-type-name.type';

@Component({
    selector: 'dynamic-input',
    templateUrl: './dynamic-input.component.html',
    styleUrls: ['./dynamic-input.component.scss'],
    animations: FuseAnimations
})
export class DynamicInputComponent implements OnInit {

    public index: number;
    public removeInput: (index: number) => void;

    dynamicInputForm: FormGroup;
    inputTypes: InputType[] = [];
    optionColumns: string[] = ['element', 'value', 'options'];
    options: string[] = [];
    dataSource = new MatTableDataSource<string>([]);

    constructor(private formBuilder: FormBuilder, private inputTypeService: InputTypeService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.dynamicInputForm = this.formBuilder.group({
            title: [null, Validators.required],
            description: [null],
            inputTypeNameSelected: [null, Validators.required],
            isMandatory: [true, Validators.required]
        });

        this.inputTypeService.getAllInputTypes().subscribe((response) => {
            this.inputTypes = response.data;
            this.dynamicInputForm.patchValue({
                inputTypeNameSelected: 'TEXT'
            });
        });

        this.initializeOptions();
    }

    private initializeOptions(): void {
        this.options.push('Opción 1');
        this.options.push('Opción 2');
        this.dataSource.data = this.options;
    }

    openNewOptionDialog(): void {
        const optionValue: string = this.generateNewOptionValue();
        this.dialog.open(NewOptionComponent, {
            data: {
                optionValue: optionValue,
                optionAlreadyExists: this.optionAlreadyExists,
                addOption: this.addOption
            }
        });
    }

    private generateNewOptionValue(): string {
        return 'Opción ' + (this.options.length + 1);
    }

    optionAlreadyExists = (optionValue: string): boolean => {
        for (const option of this.options) {
            if (option === optionValue) {
                return true;
            }
        }
        return false;
    }

    addOption = (value: string): void => {
        if (value) {
            this.options.push(value);
            this.dataSource.data = this.options;
        }
    }

    openEditOptionDialog(oldOption: string): void {
        this.dialog.open(EditOptionComponent, {
            data: {
                oldOptionValue: oldOption,
                optionAlreadyExists: this.optionAlreadyExists,
                editOption: this.editOption
            }
        });
    }

    editOption = (oldValue: string, newValue: string): void => {
        this.options.forEach((value, index) => {
            if (value === oldValue) {
                this.options[index] = newValue;
                this.dataSource.data = this.options;
            }
        });
    }

    removeOption(optionToRemove: string): void {
        if (this.options.length < 3) {
            // TODO Aquí hay que mostrar un modal
            return;
        }
        this.options.forEach((value, index) => {
            if (value === optionToRemove) {
                this.options.splice(index, 1);
                this.dataSource.data = this.options;
            }
        });
    }

    removeMe(): void {
        this.removeInput(this.index);
    }

    isInputTypeWithOptionValues(): boolean {
        const inputTypeNameSelected: InputTypeName = this.dynamicInputForm.value.inputTypeNameSelected;
        return InputTypesWithOptionValues.includes(inputTypeNameSelected);
    }

    getTitle(): string {
        return this.dynamicInputForm.value.title;
    }

    getDescription(): string {
        return this.dynamicInputForm.value.description;
    }

    getInputTypeSelected(): InputType {
        for (const inputType of this.inputTypes) {
            if (inputType.name === this.dynamicInputForm.value.inputTypeNameSelected) {
                return inputType;
            }
        }
    }

    isMandatory(): boolean {
        return this.dynamicInputForm.value.isMandatory;
    }

}
