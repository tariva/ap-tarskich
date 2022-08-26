using Microsoft.AspNetCore.Mvc;
using WordCount.Models;

namespace WordCount.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WordCountController : ControllerBase
    {
        
        private readonly ILogger<WordCountController> _logger;
        private readonly IWebHostEnvironment env;

        public WordCountController(ILogger<WordCountController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            this.env = env;
        }
        [HttpPost]
        public async Task<IActionResult> uploader()
        {
            var filelist = HttpContext.Request.Form.Files;
            var name = HttpContext.Request.Form["name"];
            var chunkIndex = HttpContext.Request.Form["chunkIndex"];
            var totalChunk = HttpContext.Request.Form["totalChunk"];
            string filePath = String.Empty;
            if (filelist.Count > 0)
            {
                foreach (var file in filelist)
                {
                    var uploadDirecotroy = "uploads/";
                    var uploadPath = Path.Combine(env.WebRootPath, uploadDirecotroy);

                    if (!Directory.Exists(uploadPath))
                        Directory.CreateDirectory(uploadPath);

                    // var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    var fileName = Path.GetFileName(file.FileName);
                    filePath = Path.Combine(uploadPath, fileName);
                    
                    using (var fileStream = new FileStream(Path.Combine(filePath), FileMode.OpenOrCreate))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                }
            }
            if (!String.IsNullOrEmpty(chunkIndex) && !String.IsNullOrEmpty(totalChunk) )
            {
                if (chunkIndex == totalChunk)
                {
                    // trigger Couting Task
                    var x = new WordCounter(filePath).CountWords().Result.ToHashSet();
                    return Ok(x);
                }
            }
            else
            {
                // trigger Couting Task
                var x = new WordCounter(filePath).CountWords().Result.ToHashSet();
                return Ok(x);
            }
            return  Ok(new { count = 1 });
        }
        
        
        
    }
}
