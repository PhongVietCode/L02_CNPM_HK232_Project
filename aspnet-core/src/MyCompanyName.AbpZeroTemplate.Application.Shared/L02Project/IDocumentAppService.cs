using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Editions.Dto;
using MyCompanyName.AbpZeroTemplate.L02Project.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.L02Project
{
    public interface IDocumentAppService: IApplicationService
    {
        // create document
        Task CreateDocument(CreateDocumentInput input);
        // search document
        ListResultDto<DocumentListDto> GetDocument(GetDocumentInput input);
        // edit document
        Task EditDocument(EditDocumentInput input);
        Task<GetDocumentForEditOutput> GetDocumentForEdit(GetDocumentForEditInput input);
        // delete document
        Task DeleteDocument(EntityDto document);
    }
}
