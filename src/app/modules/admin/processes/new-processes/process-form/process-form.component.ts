import {Component, Inject, OnInit} from '@angular/core';
import {FuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'process-form',
    templateUrl: './process-form.component.html',
    animations: FuseAnimations
})
export class ProcessFormComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
    }
}
