using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.L02Project.DTO
{
    public class DocumentListDto : FullAuditedEntityDto
    {
        public string IDNumber { get; set; }
        public string Title { get; set; }
        public DocType Doctype { get; set; }
        public string StartDay { get; set; }
        public string ExpireDay { get; set; }
        public string FilePath { get; set; }
    }
}
