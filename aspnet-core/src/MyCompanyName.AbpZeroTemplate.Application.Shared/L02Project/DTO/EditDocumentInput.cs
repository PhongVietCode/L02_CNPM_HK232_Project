﻿using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.L02Project.DTO
{
    // save information after edit
    public class EditDocumentInput
    {
        public int Id { get; set; }
        public string IDNumber { get; set; }
        public string Title { get; set; }
        public string StartDay { get; set; }
        public string ExpireDay { get; set; }
        public string FilePath { get; set; }
    }
    // result after edit
    public class GetDocumentForEditOutput
    {
        public int Id { get; set; }
        public string IDNumber { get; set; }
        public string Title { get; set; }
        public string StartDay { get; set; }
        public string ExpireDay { get; set; }
        public string FilePath { get; set; }

    }
    // document id which need to edit
    public class GetDocumentForEditInput
    {
        public int Id { get; set; }
    }

}
