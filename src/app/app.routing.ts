import {Route} from '@angular/router';
import {AuthGuard} from 'app/core/auth/guards/auth.guard';
import {NoAuthGuard} from 'app/core/auth/guards/no-auth.guard';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch: 'full', redirectTo: 'startup-profile'},

    // Redirect signed in user to the '/dashboards/project'
    //
    // After the user signs in, the sign in page will redirect the user to the 'logged-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'logged-in-redirect', pathMatch: 'full', redirectTo: 'startup-profile'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            // {
            //     path: 'confirmation-required',
            //     loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)
            // },
            // {
            //     path: 'reset-password',
            //     loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)
            // },
            {
                path: 'log-in',
                loadChildren: () => import('app/modules/auth/log-in/log-in.module').then(m => m.LogInModule)
            },
            {
                path: 'register',
                loadChildren: () => import('app/modules/auth/register/register.module').then(m => m.RegisterModule)
            },
            {
                path: 'restore-password',
                loadChildren: () => import('app/modules/auth/restore-password/restore-password.module')
                    .then(m => m.RestorePasswordModule)
            }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'log-out',
                loadChildren: () => import('app/modules/auth/log-out/log-out.module').then(m => m.LogOutModule)
            },
            // {
            //     path: 'startup-profile',
            //     loadChildren: () => import('app/modules/admin/startup-profile/startup-profile.module')
            //         .then(m => m.StartupProfileModule)
            // },
            // {
            //     path: 'unlock-session',
            //     loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
            // }
        ]
    },

    // Landing routes
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children: [
    //         {
    //             path: 'home',
    //             loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
    //         },
    //     ]
    // },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'classy'
        },
        // resolve: {
        //     initialData: InitialDataResolver,
        // },
        children: [
            {
                path: 'startup-profile',
                loadChildren: () => import('app/modules/admin/startup-profile/startup-profile.module')
                    .then(m => m.StartupProfileModule)
            },
            {
                path: 'roles',
                loadChildren: () => import('app/modules/admin/roles/role.module').then(m => m.RoleModule)
            },
            {
                path: 'users',
                loadChildren: () => import('app/modules/admin/users/user.module').then(m => m.UserModule)
            },
            {
                path: 'departments',
                loadChildren: () => import('app/modules/admin/departments/department.module')
                    .then(m => m.DepartmentModule)
            },
            {
                path: 'processes',
                loadChildren: () => import('app/modules/admin/processes/process.module').then(m => m.ProcessModule)
            },
            {
                path: 'requests',
                loadChildren: () => import('app/modules/admin/requests/request.module')
                    .then(m => m.RequestModule)
            }


            // Dashboards
            // {
            //     path: 'dashboards', children: [
            //         {
            //             path: 'project',
            //             loadChildren: () => import('app/modules/admin/dashboards/project/project.module').then(m => m.StartupProfileModule)
            //         },
            //         {
            //             path: 'analytics',
            //             loadChildren: () => import('app/modules/admin/dashboards/analytics/analytics.module').then(m => m.AnalyticsModule)
            //         },
            //     ]
            // },
            //
            // // Apps
            // {
            //     path: 'apps', children: [
            //         {
            //             path: 'academy',
            //             loadChildren: () => import('app/modules/admin/apps/academy/academy.module').then(m => m.AcademyModule)
            //         },
            //         {
            //             path: 'calendar',
            //             loadChildren: () => import('app/modules/admin/apps/calendar/calendar.module').then(m => m.CalendarModule)
            //         },
            //         {
            //             path: 'chat',
            //             loadChildren: () => import('app/modules/admin/apps/chat/chat.module').then(m => m.ChatModule)
            //         },
            //         {
            //             path: 'contacts',
            //             loadChildren: () => import('app/modules/admin/apps/contacts/contacts.module').then(m => m.ContactsModule)
            //         },
            //         {
            //             path: 'ecommerce',
            //             loadChildren: () => import('app/modules/admin/apps/ecommerce/ecommerce.module').then(m => m.ECommerceModule)
            //         },
            //         {
            //             path: 'file-manager',
            //             loadChildren: () => import('app/modules/admin/apps/file-manager/file-manager.module').then(m => m.FileManagerModule)
            //         },
            //         {
            //             path: 'help-center',
            //             loadChildren: () => import('app/modules/admin/apps/help-center/help-center.module').then(m => m.HelpCenterModule)
            //         },
            //         {
            //             path: 'mailbox',
            //             loadChildren: () => import('app/modules/admin/apps/mailbox/mailbox.module').then(m => m.MailboxModule)
            //         },
            //         {
            //             path: 'notes',
            //             loadChildren: () => import('app/modules/admin/apps/notes/notes.module').then(m => m.NotesModule)
            //         },
            //         {
            //             path: 'tasks',
            //             loadChildren: () => import('app/modules/admin/apps/tasks/tasks.module').then(m => m.TasksModule)
            //         },
            //     ]
            // },
            //
            // // Pages
            // {
            //     path: 'pages', children: [
            //
            //         // Authentication
            //         {
            //             path: 'authentication',
            //             loadChildren: () => import('app/modules/admin/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
            //         },
            //
            //         // Coming soon
            //         {
            //             path: 'coming-soon',
            //             loadChildren: () => import('app/modules/admin/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule)
            //         },
            //
            //         // Error
            //         {
            //             path: 'error', children: [
            //                 {
            //                     path: '404',
            //                     loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)
            //                 },
            //                 {
            //                     path: '500',
            //                     loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module)
            //                 }
            //             ]
            //         },
            //
            //         // Invoice
            //         {
            //             path: 'invoice', children: [
            //                 {
            //                     path: 'printable', children: [
            //                         {
            //                             path: 'compact',
            //                             loadChildren: () => import('app/modules/admin/pages/invoice/printable/compact/compact.module').then(m => m.CompactModule)
            //                         },
            //                         {
            //                             path: 'modern',
            //                             loadChildren: () => import('app/modules/admin/pages/invoice/printable/modern/modern.module').then(m => m.ModernModule)
            //                         }
            //                     ]
            //                 }
            //             ]
            //         },
            //
            //         // Maintenance
            //         {
            //             path: 'maintenance',
            //             loadChildren: () => import('app/modules/admin/pages/maintenance/maintenance.module').then(m => m.MaintenanceModule)
            //         },
            //
            //         // Pricing
            //         {
            //             path: 'pricing', children: [
            //                 {
            //                     path: 'modern',
            //                     loadChildren: () => import('app/modules/admin/pages/pricing/modern/modern.module').then(m => m.PricingModernModule)
            //                 },
            //                 {
            //                     path: 'simple',
            //                     loadChildren: () => import('app/modules/admin/pages/pricing/simple/simple.module').then(m => m.PricingSimpleModule)
            //                 },
            //                 {
            //                     path: 'single',
            //                     loadChildren: () => import('app/modules/admin/pages/pricing/single/single.module').then(m => m.PricingSingleModule)
            //                 },
            //                 {
            //                     path: 'table',
            //                     loadChildren: () => import('app/modules/admin/pages/pricing/table/table.module').then(m => m.PricingTableModule)
            //                 }
            //             ]
            //         },
            //
            //         // Profile
            //         {
            //             path: 'profile',
            //             loadChildren: () => import('app/modules/admin/pages/profile/profile.module').then(m => m.ProfileModule)
            //         },
            //     ]
            // },
            //
            // // User interface
            // {
            //     path: 'ui', children: [
            //
            //         // Angular Material
            //         {
            //             path: 'angular-material',
            //             loadChildren: () => import('app/modules/admin/ui/angular-material/angular-material.module').then(m => m.AngularMaterialModule)
            //         },
            //
            //         // TailwindCSS
            //         {
            //             path: 'tailwindcss',
            //             loadChildren: () => import('app/modules/admin/ui/tailwindcss/tailwindcss.module').then(m => m.TailwindCSSModule)
            //         },
            //
            //         // Animations
            //         {
            //             path: 'animations',
            //             loadChildren: () => import('app/modules/admin/ui/animations/animations.module').then(m => m.AnimationsModule)
            //         },
            //
            //         // Cards
            //         {
            //             path: 'cards',
            //             loadChildren: () => import('app/modules/admin/ui/cards/cards.module').then(m => m.CardsModule)
            //         },
            //
            //         // Colors
            //         {
            //             path: 'colors',
            //             loadChildren: () => import('app/modules/admin/ui/colors/colors.module').then(m => m.ColorsModule)
            //         },
            //
            //         // Datatable
            //         {
            //             path: 'datatable',
            //             loadChildren: () => import('app/modules/admin/ui/datatable/datatable.module').then(m => m.DatatableModule)
            //         },
            //
            //         // Forms
            //         {
            //             path: 'forms', children: [
            //                 {
            //                     path: 'fields',
            //                     loadChildren: () => import('app/modules/admin/ui/forms/fields/fields.module').then(m => m.FormsFieldsModule)
            //                 },
            //                 {
            //                     path: 'layouts',
            //                     loadChildren: () => import('app/modules/admin/ui/forms/layouts/layouts.module').then(m => m.FormsLayoutsModule)
            //                 },
            //                 {
            //                     path: 'wizards',
            //                     loadChildren: () => import('app/modules/admin/ui/forms/wizards/wizards.module').then(m => m.FormsWizardsModule)
            //                 }
            //             ]
            //         },
            //
            //         // Icons
            //         {
            //             path: 'icons',
            //             loadChildren: () => import('app/modules/admin/ui/icons/icons.module').then(m => m.IconsModule)
            //         },
            //
            //         // Page layouts
            //         {
            //             path: 'page-layouts',
            //             loadChildren: () => import('app/modules/admin/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule)
            //         },
            //
            //         // Typography
            //         {
            //             path: 'typography',
            //             loadChildren: () => import('app/modules/admin/ui/typography/typography.module').then(m => m.TypographyModule)
            //         }
            //     ]
            // },
            //
            // // Documentation
            // {
            //     path: 'docs', children: [
            //
            //         // Changelog
            //         {
            //             path: 'changelog',
            //             loadChildren: () => import('app/modules/admin/docs/changelog/changelog.module').then(m => m.ChangelogModule)
            //         },
            //
            //         // Guides
            //         {
            //             path: 'guides',
            //             loadChildren: () => import('app/modules/admin/docs/guides/guides.module').then(m => m.GuidesModule)
            //         },
            //
            //         // Core features
            //         {
            //             path: 'core-features',
            //             loadChildren: () => import('app/modules/admin/docs/core-features/core-features.module').then(m => m.CoreFeaturesModule)
            //         },
            //
            //         // Other components
            //         {
            //             path: 'other-components',
            //             loadChildren: () => import('app/modules/admin/docs/other-components/other-components.module').then(m => m.OtherComponentsModule)
            //         },
            //     ]
            // },
            //
            // // 404 & Catch all
            // {
            //     path: '404-not-found',
            //     pathMatch: 'full',
            //     loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)
            // },
            // {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
