using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoListaAPI.Models
{
    public class Zadatak:Entitet
    {
        public string Naziv { get; set; }
        public DateTime Datum { get; set; }
        public bool Status { get; set; }

        [ForeignKey("todo_lista")]
        public Todo_lista Todo_Lista { get; set; }

        [ForeignKey("kategorija")]
        public Kategorija Kategorija { get; set; }
    }
}
