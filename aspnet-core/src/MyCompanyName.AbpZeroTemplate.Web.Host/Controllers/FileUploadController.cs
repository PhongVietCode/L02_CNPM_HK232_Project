using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Hosting;
using Microsoft.VisualBasic;
using MyCompanyName.AbpZeroTemplate.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.L02Project;
using MyCompanyName.AbpZeroTemplate.Web.Models.FileUpload;
using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Web.Controllers
{
    public class FileUploadController: AbpZeroTemplateControllerBase
    {
        private readonly IHostEnvironment _env;

        public FileUploadController(IHostEnvironment env)
        {
            _env = env;
        }
        /*
        [HttpPost]
        [Route("UploadFile")]
        public async Task<string> UploadFile(FileUploadViewModel model)
        {
            var file = Request.Form.Files.First();
            var uniqueName = GetUniqueFileName(file.FileName);
            var dir = Path.Combine(_env.ContentRootPath, "Documents");
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }
            var filePath = Path.Combine(dir,uniqueName);
            await file.CopyToAsync(new FileStream(filePath, FileMode.Create));
            SaveFilePathToDb(model.DocumentId, filePath);
            return uniqueName;
        }
        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                   + "_"
                   + Guid.NewGuid().ToString().Substring(0, 4)
                   + Path.GetExtension(fileName);
        }
        private void SaveFilePathToDb(int id, string filePath)
        {
            // todo: save to Document database
            
        }*/

        [HttpPost]
        [Route("UploadFile")]
        public async Task<IActionResult> UploadFile(IFormFile file, CancellationToken token)
        {
            var result = await WriteFile(file);
            return Ok(result);
        }
        [HttpGet]
        [Route("DownloadFile")]
        public async Task<IActionResult> DownloadFile(string fileName)
        {
            var dir = Path.Combine(_env.ContentRootPath, "Documents");
            var filePath = Path.Combine(dir, fileName);
            var provider = new FileExtensionContentTypeProvider();
            if(!provider.TryGetContentType(filePath, out var contentType)) {
                contentType = "application/octet-stream";
            }
            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(bytes, contentType, Path.GetFileName(filePath));

        }
        public async Task<string> WriteFile(IFormFile file)
        {
            var uniqueName = GetUniqueFileName(file.FileName);
            var dir = Path.Combine(_env.ContentRootPath, "Documents");
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }
            var filePath = Path.Combine(dir, uniqueName);
            await file.CopyToAsync(new FileStream(filePath, FileMode.Create));
            return uniqueName;
        }
        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                   + "_"
                   + Guid.NewGuid().ToString().Substring(0, 4)
                   + Path.GetExtension(fileName);
        }
    }
}
