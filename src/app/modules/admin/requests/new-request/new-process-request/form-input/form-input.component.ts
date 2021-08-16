import {Component, OnInit} from '@angular/core';
import {FuseAnimations} from '../../../../../../../@fuse/animations';
import {InputDetailedResponse} from '../../../../../../interfaces/responses/input-detailed-response.interface';
import {FileData} from '../../../../../../interfaces/data/file-data.interface';
import {FileRequest} from '../../../../../../interfaces/requests/file-request.interface';

@Component({
    selector: 'input-dynamic',
    templateUrl: './form-input.component.html',
    styleUrls: ['./form-input.component.scss'],
    animations: FuseAnimations
})
export class FormInputComponent implements OnInit {

    public detailedInput: InputDetailedResponse;

    inputValue: string;
    acceptedExtension: string = 'application/pdf,image/jpeg,image/jpg,image/png';

    fileName: string;

    constructor() {
    }

    ngOnInit(): void {
    }

    saveSelectedFile = (fileData: FileData): void => {
        this.fileName = fileData.fileName;
        const fileRequest: FileRequest = {
            fileContent: fileData.fileContent,
            extension: fileData.extension
        };
        this.inputValue = JSON.stringify(fileRequest);
    }

    public getInputValue(): string {
        return this.inputValue;
    }

}
