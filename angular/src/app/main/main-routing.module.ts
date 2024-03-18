import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentComponent } from './document/document.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
                        data: { permission: 'Pages.Tenant.Dashboard' },
                    },
                    {
                        path: 'document',
                        loadChildren: () => import('./document/document.module').then((m) => m.DocumentModule),
                        
                    },
                    {
                        path: 'document',
                        component: DocumentComponent
                    },
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule {}
