using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
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
                    doc => doc.Title.Contains(input.Filter)
                 )
                 .ToList();
            return new ListResultDto<DocumentListDto>(ObjectMapper.Map<List<DocumentListDto>>(doc));
        }
        public async Task CreateDocument(CreateDocumentInput input)
        {
            var document = ObjectMapper.Map<Document>(input);
            await _documentRepository.InsertAsync(document);
        }

    }
}
