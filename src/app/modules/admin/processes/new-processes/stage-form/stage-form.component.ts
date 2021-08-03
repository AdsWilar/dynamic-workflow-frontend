import {Component, Inject, OnInit} from '@angular/core';
import {FuseAnimations} from '../../../../../../@fuse/animations';


@Component({
    selector: 'stage-form',
    templateUrl: './stage-form.component.html',
    animations: FuseAnimations
})
export class StageFormComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
    }
}
