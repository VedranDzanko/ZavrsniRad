using ToDoListaAPI.Data;
using ToDoListaAPI.Models;
using ToDoListaAPI.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.Xml;

namespace ToDoListaAPI.Controllers
{/// <summary>
 /// Namijenjeno za CRUD operacije na entitetu Todo Lista u bazi
 /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ToDoCntroller:ControllerBase
    {
        private readonly ToDoContext _context;
        private readonly ILogger<ToDoCntroller> _logger;

        public ToDoCntroller(ToDoContext context, ILogger<ToDoCntroller> logger)
        {
            _context = context;
            _logger = logger;
        }
        /// <summary>
        /// Dohvaća sve TodoListe iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    GET api/v1/TodoLista
        ///
        /// </remarks>
        /// <returns>TodoLista u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Na azure treba dodati IP u firewall</response> 
        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("Dohvacam to do liste");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var liste = _context.Todo_Lista
                    .Include(l => l.Korisnik)
                    .ToList();
                if (liste==null || liste.Count==0)
                {
                    return new EmptyResult();
                }
                List<ToDoDTO> lista = new();
                liste.ForEach(l =>
                {
                    lista.Add(new ToDoDTO
                    {
                        Sifra=l.Sifra,
                        Naziv=l.Naziv,
                        korisnik=l.Korisnik?.Korisnicko_ime,
                        SifraKorisnik=l.Korisnik.Sifra

                    });
                });
                return Ok(lista);
            }
            catch (Exception ex)
            {

                return StatusCode(
                     StatusCodes.Status503ServiceUnavailable,
                     ex);
            }
        }
        /// <summary>
        /// Dodaje TodoListu u bazu
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    POST api/v1/TodoLista
        ///    {naziv:"",Korisnik:""}
        ///
        /// </remarks>
        /// <returns>Kreirana TodoLista u bazi s svim podacima</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Na azure treba dodati IP u firewall</response> 
        [HttpPost]
        public IActionResult Post(ToDoDTO toDoDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (toDoDTO.SifraKorisnik<=0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var korisnik = _context.Korisnik.Find(toDoDTO.SifraKorisnik);
                if (korisnik==null)
                {
                    return BadRequest(ModelState);
                }
                Todo_lista t = new()
                {
                    Naziv=toDoDTO.Naziv,
                    Korisnik=korisnik
                };
                _context.Todo_Lista.Add(t);
                _context.SaveChanges();

                toDoDTO.Sifra = t.Sifra;
                toDoDTO.korisnik = korisnik.Korisnicko_ime;
                return Ok(toDoDTO);
            }
            catch (Exception ex)
            {

                return StatusCode(
                   StatusCodes.Status503ServiceUnavailable,
                   ex);
            }
        }
        /// <summary>
        /// Mijenja podatke postojeće TodoListe u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/TodoLista/1
        ///
        /// {
        ///   "sifra": 0,
        ///   "naziv": "string",
        ///   "korisnik": "string",
        ///   
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra TodoListe koja se mijenja</param>  
        /// <returns>Svi poslani podaci od TodoListe</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi TodoListe koju želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Na azure treba dodati IP u firewall</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra,  ToDoDTO toDoDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(sifra<=0 || toDoDTO==null)
            {
                return BadRequest();
            }
            try
            {
                var korisnik = _context.Korisnik.Find(toDoDTO.SifraKorisnik);
                if (korisnik==null)
                {
                    return BadRequest();
                }
                var lista = _context.Todo_Lista.Find(sifra);
                if (lista==null)
                {
                    return BadRequest();
                }
                lista.Naziv=toDoDTO.Naziv;
                lista.Korisnik = korisnik;

                _context.Todo_Lista.Update(lista);
                _context.SaveChanges();

                toDoDTO.Sifra = sifra;
                toDoDTO.korisnik = korisnik.Korisnicko_ime;
                toDoDTO.korisnik = korisnik.Lozinka;
                return Ok(toDoDTO);

            }
            catch (Exception ex)
            {

                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }
        /// <summary>
        /// Briše TodoListu iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    DELETE api/v1/TodoLista/1
        ///    
        /// </remarks>
        /// <param name="sifra">Šifra TodoListe koja se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi TodoListe kojeu želimo obrisati</response>
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
            var listaBaza = _context.Todo_Lista.Find(sifra);
            if (listaBaza==null)
            {
                return BadRequest();
            }
            try
            {
                _context.Todo_Lista.Remove(listaBaza);
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
