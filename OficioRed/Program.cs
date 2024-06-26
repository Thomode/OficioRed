using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OficioRed.Context;
using OficioRed.Helpers;
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

// Agregar opcion de token al swagger
builder.Services.AddSwaggerGen(config =>
{
    config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        In = ParameterLocation.Header,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        Description = "JWT Authorization header using the Bearer scheme."
    });

    config.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

// Agregando los services
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IRubroService, RubroService>();
builder.Services.AddScoped<IAccesoService, AccesoService>();
builder.Services.AddScoped<IInteresadoService, InteresadoService>();
builder.Services.AddScoped<IProfesionalService, ProfesionalService>();
builder.Services.AddScoped<IRolService, RolService>();
builder.Services.AddScoped<IRatingService, RatingService>();
builder.Services.AddScoped<IComentarioService, ComentarioService>();
builder.Services.AddScoped<IContactoService, ContactoService>();
builder.Services.AddScoped<IFavoritoService, FavoritoService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors("NuevaPolitica");

// global error handler
app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();