using System.ComponentModel.DataAnnotations;

namespace ToDoListaAPI.Models
{
    public abstract class Entitet
    {
        [Key]
        public int Sifra { get; set; }
    }
}
