using ToDoListaAPI.Data;
using ToDoListaAPI.Models;
using ToDoListaAPI.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace ToDoListaAPI.Controllers
{/// <summary>
 /// Namijenjeno za CRUD operacije na entiteu zadatak u bazi
 /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ZadatakController:ControllerBase
    {
        private readonly ToDoContext _context;
        private readonly ILogger<ZadatakController> _logger;

        public ZadatakController(ToDoContext context, ILogger<ZadatakController> logger)
        {
            _context = context;
            _logger = logger;
        }
        /// <summary>
        /// Dohvaća sve zadatke iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    GET api/v1/Zadatak
        ///
        /// </remarks>
        /// <returns>Polaznici u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Na azure treba dodati IP u firewall</response> 
        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("Dohvacam zadatke");
            if (!ModelState.IsValid) {
            
            return BadRequest(ModelState);}
            try
            {
                var zadatci = _context.Zadatak
                    .Include(z => z.Todo_Lista)
                    .Include(z => z.Kategorija).ToList();
                if (zadatci==null || zadatci.Count==0)
                {
                    return new EmptyResult();
                }
                List<ZadatakDTO> zadatak = new();

                zadatci.ForEach(z =>
                {
                    zadatak.Add(new ZadatakDTO
                    {
                        Sifra=z.Sifra,
                        Naziv=z.Naziv,
                        Datum=z.Datum,
                        Todo_lista=z.Todo_Lista?.Naziv,
                        Kategorija=z.Kategorija?.Naziv,
                        Status=z.Status,
                        SifraTodo=z.Sifra,
                        SifraKategorija=z.Sifra

                    });
                });
                return Ok(zadatak);
            }
            catch (Exception ex)
            {

                return StatusCode(
                   StatusCodes.Status503ServiceUnavailable,
                   ex);
            }
        }
        /// <summary>
        /// Dodaje zadatak u bazu
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    POST api/v1/Zadatak
        ///    {Ime:"",Prezime:""}
        ///
        /// </remarks>
        /// <returns>Kreirani zadatak u bazi s svim podacima</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Na azure treba dodati IP u firewall</response> 
        [HttpPost]
        public IActionResult Post(ZadatakDTO zadatakDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (zadatakDTO.SifraKategorija<=0 || zadatakDTO.SifraTodo<=0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var kategorija = _context.Kategorija.Find(zadatakDTO.SifraKategorija);
                var lista = _context.Todo_Lista.Find(zadatakDTO.SifraTodo);
                if (kategorija==null || lista==null)
                {
                    return BadRequest(ModelState);
                }
                Zadatak z = new()
                {
                    Naziv=zadatakDTO.Naziv,
                    Datum=zadatakDTO.Datum,
                    Status=zadatakDTO.Status,
                    Kategorija=kategorija,
                    Todo_Lista=lista
                };
                _context.Zadatak.Add(z);
                _context.SaveChanges();

                zadatakDTO.Sifra = z.Sifra;
                zadatakDTO.Kategorija = kategorija.Naziv;
                zadatakDTO.Todo_lista = lista.Naziv;
                return Ok(zadatakDTO);
            }
            catch (Exception ex)
            {

                return StatusCode(
                  StatusCodes.Status503ServiceUnavailable,
                  ex);
            }
        }
        /// <summary>
        /// Mijenja podatke postojećeg zadatka u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/Zadatak/1
        ///
        /// {
        ///   sifra,
        ///naziv,
        ///datum datetime,
        // status ,
        //todo_lista ,
        //kategorija 
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra zadatka koji se mijenja</param>  
        /// <returns>Svi poslani podaci od zadatka</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi zadatak kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Na azure treba dodati IP u firewall</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra,ZadatakDTO zadatakDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();

            }
            if (sifra<=0 || zadatakDTO==null)
            {
                return BadRequest();
            }
            try
            {
                var kategorija = _context.Kategorija.Find(zadatakDTO.SifraKategorija);
                var lista = _context.Todo_Lista.Find(zadatakDTO.SifraTodo);
                if (kategorija==null || lista==null)
                {
                    return BadRequest();
                }
                var zadatak = _context.Zadatak.Find(sifra);
                if (zadatak==null)
                {
                    return BadRequest();
                }
                zadatak.Naziv = zadatakDTO.Naziv;
                zadatak.Status = zadatakDTO.Status;
                zadatak.Datum = zadatakDTO.Datum;

                _context.Zadatak.Update(zadatak);
                _context.SaveChanges();

                zadatakDTO.Sifra= sifra;
                zadatakDTO.Kategorija = kategorija.Naziv;
                zadatakDTO.Todo_lista = lista.Naziv;

                return Ok(zadatakDTO);
            }
            catch (Exception ex)
            {

                return StatusCode(
                   StatusCodes.Status503ServiceUnavailable,
                   ex.Message);
            }
        }
        /// <summary>
        /// Briše zadatak iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    DELETE api/v1/Zadatak/1
        ///    
        /// </remarks>
        /// <param name="sifra">Šifra zadatka koji se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi zadatka kojeg želimo obrisati</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Na azure treba dodati IP u firewall</response> 
        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (sifra<=0)
            {
                return BadRequest();
            }
            var zadatakBaza = _context.Zadatak.Find(sifra);
            if (zadatakBaza==null)
            {
                return BadRequest();
            }
            try
            {
                _context.Zadatak.Remove(zadatakBaza);
                _context.SaveChanges();
                return new JsonResult("{\"poruka\":\"Obrisano\"}");
            }
            catch (Exception ex)
            {
                return new JsonResult("{\"poruka\":\"Ne može se obrisati\"}");
            }
        }
    }
}
