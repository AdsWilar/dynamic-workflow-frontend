import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {AuthManager} from 'app/core/auth/auth-manager';
import {AuthInterceptor} from 'app/core/auth/auth.interceptor';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AuthManager,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {

    constructor(private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry,
                @Optional() @SkipSelf() parentModule?: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }

        // Register icon sets
        this.matIconRegistry.addSvgIconSet(
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-twotone.svg')
        );
        this.matIconRegistry.addSvgIconSetInNamespace(
            'mat_outline',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-outline.svg')
        );
        this.matIconRegistry.addSvgIconSetInNamespace(
            'mat_solid',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-solid.svg')
        );
        this.matIconRegistry.addSvgIconSetInNamespace(
            'iconsmind',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/iconsmind.svg')
        );
        this.matIconRegistry.addSvgIconSetInNamespace(
            'feather',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/feather.svg')
        );
        this.matIconRegistry.addSvgIconSetInNamespace(
            'heroicons_outline',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-outline.svg')
        );
        this.matIconRegistry.addSvgIconSetInNamespace(
            'heroicons_solid',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-solid.svg')
        );
    }

}
