﻿using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.L02Project
{
    [Table("Document")]
    public class Document : FullAuditedEntity
    {
        [Required]
        public virtual string IDNumber { get; set; }
        [Required]
        public virtual string Title { get; set; }
        public virtual DocType Doctype { get; set; }
        [Required]
        public virtual string StartDay { get; set; }
        [Required]
        public virtual string ExpireDay { get; set; }
    }
}