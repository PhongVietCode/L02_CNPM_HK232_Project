using MyCompanyName.AbpZeroTemplate.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.L02Project;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Migrations.Seed.Host
{
    public class InitialDocumentCreator
    {
        private readonly AbpZeroTemplateDbContext _context;
        public InitialDocumentCreator(AbpZeroTemplateDbContext context)
        {
            _context = context;
        }
        public void Create()
        {
           var doc1 = _context.Documents.FirstOrDefault(p => p.Title == "Avenger endgame 2: Tony Stark Reborn");
            if (doc1 == null)
            {
                _context.Documents.Add(
                    new Document
                    {
                        Title = "Avenger endgame 2: Tony Stark Reborn",
                        IDNumber = "WQER41287",
                        StartDay = "12/12/2014",
                        ExpireDay = "03/12/2016"
                    });
            }

            var doc2 = _context.Documents.FirstOrDefault(p => p.Title == "Autumn Solder 2: Infinity fight");
            if (doc2 == null)
            {
                _context.Documents.Add(
                    new Document
                    {
                        Title = "Autumn Solder 2: Infinity fight",
                        IDNumber = "ORQR9048",
                        StartDay = "09/10/2023",
                        ExpireDay = "03/12/2025"
                    });
            }
        }
    }
}
