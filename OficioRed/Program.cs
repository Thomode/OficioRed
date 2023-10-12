using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OficioRed.Context;
using OficioRed.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Agregando automapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Agregando HttpContextAccessor
builder.Services.AddHttpContextAccessor();

// Agregando CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app =>
        app
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

// Agregando JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    }
);

// Agregando la base de datos
builder.Services.AddDbContext<DbOficioRedContext>(options =>

    options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"))
);

// Agregando los services
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IOficioService, OficioService>();
builder.Services.AddScoped<IAccesoService, AccesoService>();
builder.Services.AddScoped<IInteresadoService, InteresadoService>();
builder.Services.AddScoped<IProfesionalService, ProfesionalService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("NuevaPolitica");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();