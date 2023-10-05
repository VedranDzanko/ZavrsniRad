namespace ToDoListaAPI.Models
{
    public class Korisnik:Entitet
    {
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Korisnicko_ime { get; set; }
        public string Lozinka { get; set; }
    }
}
