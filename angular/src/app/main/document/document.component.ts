import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DocType, DocumentListDto, DocumentServiceProxy,ListResultDtoOfDocumentListDto } from '@shared/service-proxies/service-proxies';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { remove as _remove } from 'lodash-es';

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
    selectedDocuments: DocumentListDto

    filter: string = ''
    selectedItem: any;
    Documents : string = "Văn bản pháp lý"
    DocumentsHeaderInfo : string = "Quản lý các văn bản nhanh chóng"
    suggestions: any[] | undefined;
    loading: boolean = true;
    constructor(
        injector: Injector,
        private _documentService: DocumentServiceProxy,
        private http: HttpClient
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
            this.loading = false;
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
    onDocumentDownload(_document: DocumentListDto):void{
        if(_document.filePath == null){
            this.message.error("This document doesn't have file to download", "Download Failed")
        }
        else{
            console.log(_document.filePath)
            this.http.get(`https://localhost:44301/DownloadFile?filename=${_document.filePath}`, { observe: 'response',responseType: 'blob' })
            .subscribe((resp) => {
                console.log(resp)
                const blobData = resp.body;
                const url = window.URL.createObjectURL(blobData);
                const link = document.createElement('a');
                link.href = url;
                link.download = _document.filePath;
                link.click();
                // Clean up the blob URL
                window.URL.revokeObjectURL(url);
            });
        }

    }
    getDocumentTypeAsString(doctype: DocType): string{
        switch(doctype){
            case 0:
                return "PDF";
            case 1:
                return "Excel";
            default: return "Unknown";
        }
    }
    deleteDocument(document: DocumentListDto): void{
        this.message.confirm(
            'AreYouSureToDeleteTheDocument',"Becarefull",
            isConfirmed => {
                if(isConfirmed){
                    this._documentService.deleteDocument(document.id).subscribe(() =>{
                        this.notify.info(this.l('SuccessfullyDeleted'));
                        _remove(this.documents, document);
                    })
                }
            }
        )
    }
}