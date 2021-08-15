import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../../../../@fuse/components/alert';
import {FuseAnimations} from '../../../../../../../@fuse/animations';

@Component({
    selector: 'new-option',
    templateUrl: './new-option.component.html',
    animations: FuseAnimations
})
export class NewOptionComponent implements OnInit {

    newOptionForm: FormGroup;
    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };
    showAlert: boolean = false;
    @ViewChild('newOptionNgForm') newOptionNgForm: NgForm;

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<NewOptionComponent>) {
    }

    ngOnInit(): void {
        this.newOptionForm = this.formBuilder.group({
            optionValue: [this.data.optionValue, Validators.required]
        });
    }

    addNewOption(): void {
        this.showAlert = false;
        if (this.newOptionForm.invalid) {
            return;
        }
        const newValue: string = this.newOptionForm.value.optionValue;
        if (this.data.optionAlreadyExists(newValue.trim())) {
            this.alert = {
                type: 'error',
                message: 'Ya existe una opción con el nombre: ' + newValue + '.'
            };
            this.showAlert = true;
            return;
        }
        this.newOptionNgForm.resetForm();
        this.data.addOption(newValue);
        this.dialogRef.close();
    }

}
