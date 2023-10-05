using ToDoListaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ToDoListaAPI.Data
{
    public class ToDoContext:DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options) 
            : base(options) { 
        
        }
        public DbSet<Korisnik>Korisnik { get; set; }
        public DbSet<Kategorija> Kategorija { get; set;}
        public DbSet<Todo_lista> Todo_Lista { get; set; }
        public DbSet<Zadatak> Zadatak { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo_lista>().HasOne(t => t.Korisnik);
            modelBuilder.Entity<Zadatak>().HasOne(z => z.Todo_Lista);
            modelBuilder.Entity<Zadatak>().HasOne(z => z.Kategorija);
        }
    }
}
