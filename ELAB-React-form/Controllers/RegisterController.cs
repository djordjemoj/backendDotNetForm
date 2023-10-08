using ELAB_React_form;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Project1.Controllers
    {
        [ApiController]
        [Route("[controller]")]
        public class RegisterController : ControllerBase
        {
            private static readonly string[] Summaries = new[]
            {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

            private readonly ILogger<RegisterController> _logger;
            private readonly IConfiguration _configuration;


        public RegisterController(IConfiguration configuration, ILogger<RegisterController> logger)
            {
                _logger = logger;
            _configuration = configuration;
            }

            [HttpPost]
            public ActionResult Get(RegisterDTO registerDTO)
            {
                if (registerDTO is null) return BadRequest();

                if (registerDTO.PromoCode.Length <8) return BadRequest("Password must be at least 8 characters long");

                string json = JsonSerializer.Serialize(registerDTO);

                string relativeFilePath = $"Registrations/{registerDTO.Email}.json";

                string jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), relativeFilePath);


                var client = new MongoClient(_configuration.GetConnectionString("mongo"));
                var database = client.GetDatabase("ElabDemoDatabase"); 
                var collection = database.GetCollection<BsonDocument>("Registrations");

                var bsonDocument = BsonDocument.Parse(json);
                collection.InsertOne(bsonDocument);

                //upis u lokalni fajl
                System.IO.File.WriteAllText(jsonFilePath, json);

                _logger.LogInformation($"Uspesno prijavljen korisnik {registerDTO.Email}");



                return Ok();
            }
        }
    }