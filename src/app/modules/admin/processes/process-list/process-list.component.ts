import {Component, Input, OnInit} from '@angular/core';
import {ProcessDetailResponse} from '../../../../interfaces/responses/process-detail-response.interface';

@Component({
    selector: 'process-list',
    templateUrl: './process-list.component.html',
    styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'status', 'creator', 'department', 'viewDetail'];
    @Input()
    detailedProcesses: ProcessDetailResponse[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
