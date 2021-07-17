import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
    selector: 'empty-layout',
    templateUrl: './empty.component.html',
    encapsulation: ViewEncapsulation.None
})
export class EmptyLayoutComponent implements OnDestroy {

    private unsubscribeAll: Subject<any> = new Subject<any>();

    constructor() {
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
