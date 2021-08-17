import {Injectable} from '@angular/core';
import {FileResponse} from '../interfaces/responses/file-response.interface';

@Injectable({
    providedIn: 'root'
})
export class FileDownloadService {

    public downloadFile(fileResponse: FileResponse): void {
        const fileBase64: string = fileResponse.fileContent;
        const binary: string = atob(fileBase64.replace(/\s/g, ''));
        const binaryLength: number = binary.length;
        const arrayBuffer: ArrayBuffer = new ArrayBuffer(binaryLength);
        const uint8Array: Uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryLength; i++) {
            uint8Array[i] = binary.charCodeAt(i);
        }
        const file: Blob = new Blob([uint8Array], {type: fileResponse.extension});
        const fileUrl: string = URL.createObjectURL(file);
        const htmlAnchorElement: HTMLAnchorElement = document.createElement('a');

        htmlAnchorElement.href = fileUrl;
        htmlAnchorElement.target = '_blank';
        htmlAnchorElement.download = fileResponse.fileName + fileResponse.extension;
        document.body.appendChild(htmlAnchorElement);
        htmlAnchorElement.click();
    }

}
