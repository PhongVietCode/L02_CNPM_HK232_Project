using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.L02Project.DTO;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.L02Project
{
    public class DocumentAppService : AbpZeroTemplateServiceBase, IDocumentAppService
    {
        private readonly IRepository<Document> _documentRepository;

        public DocumentAppService(IRepository<Document> documentRepository)
        {
            _documentRepository = documentRepository;
        }

        public ListResultDto<DocumentListDto> GetDocument(GetDocumentInput input)
        {
            var doc = _documentRepository
                 .GetAll()
                 .OrderBy(doc => doc.Title)
                 .WhereIf(
                    !input.Filter.IsNullOrEmpty(),
                    doc => doc.Title.Contains(input.Filter) ||
                           doc.IDNumber.Contains(input.Filter)
                 )
                 .OrderBy(doc => doc.Title)
                 .ThenBy(doc => doc.IDNumber)
                 .ToList();
            return new ListResultDto<DocumentListDto>(ObjectMapper.Map<List<DocumentListDto>>(doc));
        }

        [AbpAuthorize(AppPermissions.Pages_Tenant_Document_AddNewDocument)]
        public async Task CreateDocument(CreateDocumentInput input)
        {
            var document = ObjectMapper.Map<Document>(input);
            await _documentRepository.InsertAsync(document);
        }
        [AbpAuthorize(AppPermissions.Pages_Tenant_Document_EditDocument)]
        public async Task EditDocument(EditDocumentInput input)
        {
            var document = await _documentRepository.GetAsync(input.Id); // get document in database to update
            document.Title = input.Title;
            document.IDNumber = input.IDNumber;
            document.StartDay = input.StartDay;
            document.ExpireDay = input.ExpireDay;
            document.FilePath = input.FilePath;
            await _documentRepository.UpdateAsync(document); // save the updated document to db
        }
        [AbpAuthorize(AppPermissions.Pages_Tenant_Document_EditDocument)]
        public async Task<GetDocumentForEditOutput> GetDocumentForEdit(GetDocumentForEditInput input)
        {
            var document = await _documentRepository.GetAsync(input.Id);
            return ObjectMapper.Map<GetDocumentForEditOutput>(document);
        }
        [AbpAuthorize(AppPermissions.Pages_Tenant_Document_DeleteDocument)]
        public async Task DeleteDocument(EntityDto entity)
        {
            await _documentRepository.DeleteAsync(entity.Id);
        }
    }
}
