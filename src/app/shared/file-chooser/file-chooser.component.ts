import {Component, Input, OnInit} from '@angular/core';
import {FileData} from '../../interfaces/data/file-data.interface';

@Component({
    selector: 'file-chooser',
    templateUrl: './file-chooser.component.html'
})
export class FileChooserComponent implements OnInit {

    @Input()
    public buttonText: string;
    @Input()
    private acceptedExtension: string;
    @Input()
    private saveFileDataCallback: (fileData: FileData) => void;

    private fileInput: HTMLInputElement;

    ngOnInit(): void {
        this.fileInput = this.createFileInput();
        this.fileInput.onchange = () => this.onUploadingFile();
    }

    private createFileInput(): HTMLInputElement {
        const fileInput: HTMLInputElement = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = this.acceptedExtension;
        return fileInput;
    }

    onUploadingFile(): void {
        const file: File = this.fileInput.files[0];
        const fileReader: FileReader = new FileReader();
        fileReader.onloadend = (e) => {
            const fileName: string = file.name.toString();
            const fileContent: string = fileReader.result.toString();
            const base64File: string = fileContent.substring(fileContent.indexOf(',') + 1, fileContent.length);
            const fileExtension: string = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);

            const fileData: FileData = {
                fileName: fileName,
                fileContent: base64File,
                extension: fileExtension
            };

            this.saveFileDataCallback(fileData);
        };
        fileReader.readAsDataURL(file);
    }

    loadFile(): void {
        this.fileInput.click();
    }

}
