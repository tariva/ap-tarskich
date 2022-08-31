using Microsoft.AspNetCore.Mvc;
using WordCount.Models;
using System.IO;
using System;

namespace WordCount.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class WordCountController : ControllerBase
    {
        
        private readonly ILogger<WordCountController> _logger;
        private readonly IWebHostEnvironment env;
        private readonly string uploadPath;

        public WordCountController(ILogger<WordCountController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            this.env = env;
            // Todo: read from env, init directory
            var uploadDirecotroy = "uploads/";
            uploadPath = Path.Combine(env.WebRootPath, uploadDirecotroy);
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);
        }
        [HttpPost]
        public async Task<IActionResult> uploadFile()
        {
            var filelist = HttpContext.Request.Form.Files;
            var name = HttpContext.Request.Form["name"];
            var chunkIndex = HttpContext.Request.Form["chunkIndex"];
            var totalChunk = HttpContext.Request.Form["totalChunk"];
            string filePath = String.Empty;
            if (filelist.Count != 1)
            {
                throw new ArgumentException("No file provided");
            }
            var file = filelist.First();

            var fileName = Path.GetFileName(file.FileName);
            filePath = Path.Combine(uploadPath, fileName);
                    
            using (var fileStream = new FileStream(Path.Combine(filePath), FileMode.OpenOrCreate))
            {
                await file.CopyToAsync(fileStream);
            }

            if ((!String.IsNullOrEmpty(chunkIndex) && !String.IsNullOrEmpty(totalChunk) && chunkIndex == totalChunk) || String.IsNullOrEmpty(totalChunk))
            {
                
                    // trigger Couting Task
                    var x = new WordCounter(filePath).CountWords().Result;
                    return Ok(x);
            }
            return Ok(new { chunkIndex, totalChunk }) ;
        }
        
        public IActionResult deleteFile(string fileName)
        {
            var filePath = Path.Combine(uploadPath, fileName);
            if (!System.IO.File.Exists(fileName))
            {
                return NotFound();
            }
            Directory.Delete(filePath, true);
            return Ok(fileName);
        }
        [HttpGet]
        public IActionResult getExistingFiles()
        {
            string[]? files = Directory.GetFiles(uploadPath);
            files.ToList().ForEach(x => x = Path.GetFileName(x));
            return Ok(files);
        }

    }
}
