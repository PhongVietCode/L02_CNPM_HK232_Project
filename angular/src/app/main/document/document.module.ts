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
import { FileUploadComponent } from './file-upload.component';
import { EditDocumentModalComponent } from './edit-document-modal.component';
import {PdfViewerModule} from 'ng2-pdf-viewer'
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { DetailDocumentComponent } from './detail-document-component';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
    declarations: [DocumentComponent,CreateDocumentComponent,EditDocumentModalComponent, FileUploadComponent, DetailDocumentComponent],
    imports: [
        AppSharedModule,
        AdminSharedModule, 
        DocumentRoutingModule,
        FormsModule,
        ToolbarModule,
        AutoCompleteModule,
        ButtonModule,  
        PdfViewerModule,
        DialogModule,
        AccordionModule,
        InputTextModule
    ],
})
export class DocumentModule {}