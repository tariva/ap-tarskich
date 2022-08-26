using System.Collections.Concurrent;

namespace WordCount
{
    public class WordCounter
    {
        public FileStream FileStream { get; set; }
        public String Filename { get; set; }
        public WordCounter(String filename)
        {
            this.Filename = filename;
        }

        public WordCounter(FileStream fileStream)
        {
            this.FileStream = fileStream;
        }
        public async Task<ConcurrentDictionary<string, int>> CountWords()

        {
           
            var result = new ConcurrentDictionary<string, int>(StringComparer.InvariantCultureIgnoreCase);
            Parallel.ForEach(
                File.ReadLines(this.Filename),
                new ParallelOptions { MaxDegreeOfParallelism = Environment.ProcessorCount },
                (line, state, index) =>
                {
                    foreach (var x in line.Split())
                    {
                        result.AddOrUpdate(x, 1, (key, val) => val + 1);
                    }
                    
                }
            );

            return result;
        }
    }
}
