using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.L02Project.DTO
{
    public class CreateDocumentInput
    {
        [Required]
        public string IDNumber { get; set; }
        [Required]
        public string Title { get; set; }
        public DocType Doctype { get; set; }
        [Required]
        public string StartDay { get; set; }
        [Required]
        public string ExpireDay { get; set; }
        public string FilePath { get; set; }
    }
}
