import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {LoadingService} from '../../services/loading-service.service';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit{

    isLoading: Subject<boolean>;

    constructor(private loadingService: LoadingService) {
    }

    ngOnInit(): void {
        this.isLoading = this.loadingService.getIsLoading();
    }

}
