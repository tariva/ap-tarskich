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
            var name = HttpContext.Request.Form["name"];

            var fileName = Path.GetFileName(name);
            var filePath = Path.Combine(uploadPath, fileName);
           
            var x = await new WordCounter(filePath).CountWords();
            return Ok(x);
        }
        
        

    }
}
