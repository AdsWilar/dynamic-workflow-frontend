import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProcessInputsResponse} from '../../../../../interfaces/responses/process-inputs-response.interface';
import {ProcessService} from '../../../../../services/process-service.service';

@Component({
    selector: 'new-process-request',
    templateUrl: './new-process-request.component.html',
    styleUrls: ['./new-process-request.component.scss']
})
export class NewProcessRequestComponent implements OnInit {
    private subscription: Subscription;
    private processId: number;
    processInputs: ProcessInputsResponse;
    departmentId: number;


    constructor(private activatedRoute: ActivatedRoute, private processService: ProcessService) {
    }

    ngOnInit(): void {
        this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('processId') != null) {
                this.processId = +params.get('processId');
                console.log(this.processId);
                this.processService.getProcessInputsByProcessId(this.processId).subscribe((response) => {
                    this.processInputs = response.data;
                });
            }
            if (params.get('departmentId') != null) {
                this.departmentId = +params.get('departmentId');
            }
        });
    }

}
