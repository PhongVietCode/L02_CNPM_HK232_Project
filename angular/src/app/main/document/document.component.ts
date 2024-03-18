import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DocumentListDto, DocumentServiceProxy,ListResultDtoOfDocumentListDto } from '@shared/service-proxies/service-proxies';
import { MessageService } from 'primeng/api';
interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}
@Component({
    templateUrl: './document.component.html',
    animations: [appModuleAnimation()],
    providers:[MessageService],
})
export class DocumentComponent extends AppComponentBase implements OnInit{
    documents: DocumentListDto[] = []
    documentsFiltered : DocumentListDto[] = []


    filter: string = ''
    selectedItem: any;
    Documents : string = "Văn bản pháp lý"
    DocumentsHeaderInfo : string = "Quản lý các văn bản nhanh chóng"
    suggestions: any[] | undefined;
    
    constructor(
        injector: Injector,
        private _documentService: DocumentServiceProxy,
    ){
        super(injector)
    }
    ngOnInit(): void {
        this.getDocument();
    }
    search(event: AutoCompleteCompleteEvent) {
        this.filter = event.query
        this.getDocumentFiltered()
        this.suggestions = this.documentsFiltered.map(item => item.title);
    }
    getDocument():void {
        this._documentService.getDocument(this.filter).subscribe((result) => {
            this.documents = result.items;
        })
    }
    getDocumentFiltered():void {
        this._documentService.getDocument(this.filter).subscribe((result) => {
            this.documentsFiltered = result.items;
        })
    }
    save():void{

    }
    close(): void{

    }
}