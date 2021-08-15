import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DepartmentMember} from '../../../../interfaces/department-member.interface';
import {DigitalCertificateResponse} from '../../../../interfaces/responses/digital-certificate-response.interface';
import {DepartmentMemberService} from '../../../../services/department-member-service.service';
import {FileData} from '../../../../interfaces/data/file-data.interface';
import {DigitalCertificateRequest} from '../../../../interfaces/requests/digital-certificate-request.interface';
import {FileRequest} from '../../../../interfaces/requests/file-request.interface';

@Component({
    selector: 'member-detail-department',
    templateUrl: './department-member.component.html',
    styleUrls: ['./department-member.component.scss']
})
export class DepartmentMemberComponent implements OnInit {

    departmentMemberTitle: string;
    departmentMember: DepartmentMember;
    digitalCertificate: DigitalCertificateResponse;
    certificateExtension: string = '.p12';

    constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any,
                private departmentMemberService: DepartmentMemberService) {
        this.departmentMemberTitle = '';
    }

    ngOnInit(): void {
        this.departmentMember = this.data.departmentMember;
        this.departmentMemberTitle = this.departmentMember.isDepartmentBoss ? 'Jefe de departamento' : 'Analista';
        this.departmentMemberService.getDigitalCertificateByDepartmentMemberId(this.departmentMember.id)
            .subscribe((response) => {
                if (response.success) {
                    this.digitalCertificate = response.data;
                }
        });
    }

    uploadDigitalCertificate = (fileData: FileData): void => {
        const extension: string = fileData.extension;
        if ('.' + extension !== this.certificateExtension) {
            // TODO Modal de mensaje
            console.log('Sólo archivos P12...');
            return;
        }
        const certificateFile: FileRequest = {
            fileContent: fileData.fileContent,
            extension: extension
        };
        const digitalCertificateRequest: DigitalCertificateRequest = {
            certificate: certificateFile
        };
        this.departmentMemberService.uploadDigitalCertificate(digitalCertificateRequest, this.departmentMember.id)
            .subscribe((response) => {
                if (response.success) {
                    this.digitalCertificate = response.data;
                }
        });
    }

}
