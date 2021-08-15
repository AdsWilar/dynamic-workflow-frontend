import {Component, OnInit} from '@angular/core';
import {ProcessService} from '../../../services/process-service.service';
import {ProcessDetailResponse} from '../../../interfaces/responses/process-detail-response.interface';

@Component({
    selector: 'processes',
    templateUrl: './process.component.html'
})
export class ProcessComponent implements OnInit {

    detailedProcesses: ProcessDetailResponse[] = [];

    constructor(private processService: ProcessService) {
    }

    ngOnInit(): void {
        this.listDetailedProcesses();
    }

    private listDetailedProcesses(): void {
        this.processService.getAllDetailedProcesses().subscribe((response) => {
            this.detailedProcesses = response.data;
        });
    }

}
