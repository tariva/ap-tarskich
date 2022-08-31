using Microsoft.AspNetCore.Mvc;
using System.IO;
using System;

namespace WordCount.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
        public async Task<IActionResult> countWords()
        {
            var partialName = HttpContext.Request.Form["name"];

            var partialFileName = Path.GetFileName(partialName);

            DirectoryInfo hdDirectoryInWhichToSearch = new DirectoryInfo(uploadPath);
            FileInfo[] filesInDir = hdDirectoryInWhichToSearch.GetFiles( partialName + ".*");

            if (filesInDir.Length == 0)
            {
                return NotFound();
            }
            if (filesInDir.Length > 1)
            {
                return BadRequest("To many file found");
            }
            var fileName = filesInDir[0].FullName;


            var filePath = Path.Combine(uploadPath, fileName);
           
            var x = await new WordCounter(filePath).CountWords();
            return Ok(x);
        }
        
        

    }
}
