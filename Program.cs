using Parcial_Yata_Belinda;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddSingleton<MascotaDAO>();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();

app.MapRazorPages();

// Maneja el envío del formulario HTML
app.MapPost("/insertar", async (HttpContext context, MascotaDAO dao) =>
{
    var form = await context.Request.ReadFormAsync();

    string nombreMascota = form["nombreMascota"].ToString();
    string nombreDueno = form["nombreDueno"].ToString();
    string tipo = form["tipo"].ToString();
    int edad = int.TryParse(form["edad"], out int e) ? e : 0;
    string telefono = form["telefono"].ToString();
    string observacion = form["observacion"].ToString();

    dao.InsertarMascota(nombreMascota, nombreDueno, tipo, edad, telefono, observacion);

    return Results.Redirect("/");
});

// Redirige la raíz al archivo Razor
app.MapGet("/", () => Results.Redirect("/Index"));

app.Run();