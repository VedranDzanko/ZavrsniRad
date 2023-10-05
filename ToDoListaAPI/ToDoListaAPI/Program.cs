using ToDoListaAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(sgo => { // sgo je instanca klase SwaggerGenOption
    var o = new Microsoft.OpenApi.Models.OpenApiInfo()
    {
        Title = "Todo Lista",
        Version = "v1",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact()
        {
            Email = "vedran.dzanko@gmail.com",
            Name = "Vedran Džanko"
        },
        Description = "Ovo je dokumentacija za Todo Listu",
        License = new Microsoft.OpenApi.Models.OpenApiLicense()
        {
            Name = "Edukacijska licenca"
        }
    };
    sgo.SwaggerDoc("v1", o);
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    sgo.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

});


// dodavanje baze podataka
builder.Services.AddDbContext<ToDoContext>(o =>
    o.UseSqlServer(
        builder.Configuration.
        GetConnectionString(name: "ToDoContext")
        )
    );



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(opcije =>
    {
        opcije.SerializeAsV2 = true;
    });
    app.UseSwaggerUI(opcije =>
    {
        opcije.ConfigObject.
        AdditionalItems.Add("requestSnippetsEnabled", true);
    });
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseStaticFiles();
app.Run();