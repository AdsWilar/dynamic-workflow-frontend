import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../../../../@fuse/components/alert';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'edit-option',
    templateUrl: './edit-option.component.html'
})
export class EditOptionComponent implements OnInit {

    editOptionForm: FormGroup;
    alert: { type: FuseAlertType, message: string } = {
        type: 'success',
        message: ''
    };
    showAlert: boolean = false;
    @ViewChild('editOptionNgForm') editOptionNgForm: NgForm;
    oldOptionValue: string;

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<EditOptionComponent>) {
    }

    ngOnInit(): void {
        this.oldOptionValue = this.data.oldOptionValue;
        this.editOptionForm = this.formBuilder.group({
            optionValue: [this.oldOptionValue, Validators.required]
        });
    }

    editOption(): void {
        this.showAlert = false;
        if (this.editOptionForm.invalid) {
            return;
        }
        const newValue: string = this.editOptionForm.value.optionValue;
        if (newValue.trim() === this.oldOptionValue) {
            this.dialogRef.close();
            return;
        }
        if (this.data.optionAlreadyExists(newValue.trim())) {
            this.alert = {
                type: 'error',
                message: 'Ya existe una opción con el nombre: ' + newValue + '.'
            };
            this.showAlert = true;
            return;
        }
        this.editOptionNgForm.resetForm();
        this.data.editOption(this.oldOptionValue, newValue);
        this.dialogRef.close();
    }

}
