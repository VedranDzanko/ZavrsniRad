using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoListaAPI.Models
{
    public class Todo_lista:Entitet
    {
        public string Naziv { get; set; }

        [ForeignKey("korisnik")]
        public Korisnik Korisnik { get; set; }
    }
}
