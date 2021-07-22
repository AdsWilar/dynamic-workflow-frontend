import {Inject, Injectable} from '@angular/core';
import {ToasterService} from 'angular2-toaster';

@Injectable()
export class Toaster {

    constructor(@Inject(ToasterService) private toaster) {}

    error(message, data, title): void {
        this.toaster.pop('error', title, message);
        console.log('Error: ' + message, data);
    }

    info(message, data, title): void {
        this.toaster.pop('info', title, message);
        console.log('Info: ' + message, data);
    }

    success(message, data, title): void {
        this.toaster.pop('success', title, message);
        console.log('Success: ' + message, data);
    }

    warning(message, data, title): void {
        this.toaster.pop('warning', title, message);
        console.log('Warning: ' + message, data);
    }


}
