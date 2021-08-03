import {Component, Inject, OnInit} from '@angular/core';
import {FuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'sequence-of-stages',
    templateUrl: './sequence-of-stages.component.html',
    animations: FuseAnimations
})
export class SequenceOfStagesComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {

    }
}
