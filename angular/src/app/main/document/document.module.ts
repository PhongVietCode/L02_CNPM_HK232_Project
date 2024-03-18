import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { DocumentComponent } from './document.component';
import { DocumentRoutingModule } from './document-routing.module';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CreateDocumentComponent } from './create-document-component';
@NgModule({
    declarations: [DocumentComponent,CreateDocumentComponent,],
    imports: [
        AppSharedModule,
        AdminSharedModule, 
        DocumentRoutingModule,
        FormsModule,
        ToolbarModule,
        AutoCompleteModule,
        ButtonModule,   
        
    ],
})
export class DocumentModule {}