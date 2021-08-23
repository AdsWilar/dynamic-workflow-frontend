import {RequestService} from '../../services/request-service.service';
import {FileDownloadService} from '../../services/file-download-service.service';
import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RequestUtility {

    private readonly requestsTitle: string;

    constructor(private requestService: RequestService, private fileDownloadService: FileDownloadService,
                private readonly toaster: ToastrService) {
        this.requestsTitle = 'Solicitudes';
    }

    public downloadRequestForm(requestId: number): void {
        this.requestService.downloadRequestFormByRequestId(requestId)
            .subscribe((response) => {
                if (response.success) {
                    this.fileDownloadService.downloadFile(response.data);
                    this.toaster.success(
                        'Formulario de solicitud descargado exitosamente.',
                        this.requestsTitle
                    );
                    return;
                }
                this.toaster.error(
                    'Ocurrió un error al descargar el formulario de solicitud.',
                    this.requestsTitle
                );
            });
    }

}
