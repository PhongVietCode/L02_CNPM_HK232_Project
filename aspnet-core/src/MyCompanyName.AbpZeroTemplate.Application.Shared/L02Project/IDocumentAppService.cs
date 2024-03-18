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
        ListResultDto<DocumentListDto> GetDocument(GetDocumentInput input);
        Task CreateDocument(CreateDocumentInput input);
        //Task EditDocument(EditDocumentInput input);
        //Task<GetDocumentForEditOutput> GetDocumentForEdit(GetDocumentForEditInput input);
    }
}
