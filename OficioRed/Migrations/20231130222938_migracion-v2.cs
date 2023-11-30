using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OficioRed.Migrations
{
    /// <inheritdoc />
    public partial class migracionv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contacto",
                columns: table => new
                {
                    IdContacto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdProfesional = table.Column<int>(type: "int", nullable: true),
                    Telefono = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Instagram = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    Facebook = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    FHAlta = table.Column<DateTime>(type: "datetime", nullable: true),
                    FHBaja = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Contacto__A4D6BBFA9D8BBAD2", x => x.IdContacto);
                });

            migrationBuilder.CreateTable(
                name: "Pais",
                columns: table => new
                {
                    IdPais = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Pais__B501E1A5E6831DEB", x => x.IdPais);
                });

            migrationBuilder.CreateTable(
                name: "Rating",
                columns: table => new
                {
                    IdRating = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdProfesional = table.Column<int>(type: "int", nullable: true),
                    Puntuacion = table.Column<int>(type: "int", nullable: true),
                    Comentario = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    FHAlta = table.Column<DateTime>(type: "datetime", nullable: false),
                    FHBaja = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Rating__27C557CF5FBDE087", x => x.IdRating);
                });

            migrationBuilder.CreateTable(
                name: "Rol",
                columns: table => new
                {
                    IdRol = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    FHAlta = table.Column<DateTime>(type: "datetime", nullable: false),
                    FHBaja = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Rol_PK", x => x.IdRol);
                });

            migrationBuilder.CreateTable(
                name: "Rubro",
                columns: table => new
                {
                    IdRubro = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    FHAlta = table.Column<DateTime>(type: "datetime", nullable: false),
                    FHBaja = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Oficio__6B0DB913EDD02304", x => x.IdRubro);
                });

            migrationBuilder.CreateTable(
                name: "Provincia",
                columns: table => new
                {
                    IdProvincia = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IdPais = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Provinci__F7CBC757639E10A0", x => x.IdProvincia);
                    table.ForeignKey(
                        name: "FK__Provincia__PaisI__70DDC3D8",
                        column: x => x.IdPais,
                        principalTable: "Pais",
                        principalColumn: "IdPais");
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Usuario = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    Password = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    IdRol = table.Column<int>(type: "int", nullable: false),
                    Activo = table.Column<int>(type: "int", nullable: false),
                    FHAlta = table.Column<DateTime>(type: "datetime", nullable: false),
                    FHBaja = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Usuario_PK", x => x.IdUsuario);
                    table.ForeignKey(
                        name: "FK_Usuario_Rol",
                        column: x => x.IdRol,
                        principalTable: "Rol",
                        principalColumn: "IdRol");
                });

            migrationBuilder.CreateTable(
                name: "Localidad",
                columns: table => new
                {
                    IdLocalidad = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IdProvincia = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Localida__6E289F428C9FC51C", x => x.IdLocalidad);
                    table.ForeignKey(
                        name: "FK__Localidad__Provi__73BA3083",
                        column: x => x.IdProvincia,
                        principalTable: "Provincia",
                        principalColumn: "IdProvincia");
                });

            migrationBuilder.CreateTable(
                name: "Direccion",
                columns: table => new
                {
                    IdDireccion = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Calle = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Barrio = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    IdPais = table.Column<int>(type: "int", nullable: false),
                    IdProvincia = table.Column<int>(type: "int", nullable: false),
                    IdLocalidad = table.Column<int>(type: "int", nullable: false),
                    FHAlta = table.Column<DateTime>(type: "datetime", nullable: false),
                    FHBaja = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Direccion_PK", x => x.IdDireccion);
                    table.ForeignKey(
                        name: "FK_Direccion_Localidad",
                        column: x => x.IdLocalidad,
                        principalTable: "Localidad",
                        principalColumn: "IdLocalidad");
                    table.ForeignKey(
                        name: "FK_Direccion_Pais",
                        column: x => x.IdPais,
                        principalTable: "Pais",
                        principalColumn: "IdPais");
                    table.ForeignKey(
                        name: "FK_Direccion_Provincia",
                        column: x => x.IdProvincia,
                        principalTable: "Provincia",
                        principalColumn: "IdProvincia");
                });

            migrationBuilder.CreateTable(
                name: "Interesado",
                columns: table => new
                {
                    IdInteresado = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Apellido = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    FHAlta = table.Column<DateTime>(type: "datetime", nullable: false),
                    FHBaja = table.Column<DateTime>(type: "datetime", nullable: true),
                    IdDireccion = table.Column<int>(type: "int", nullable: true),
                    Email = table.Column<string>(type: "varchar(80)", unicode: false, maxLength: 80, nullable: true),
                    FotoPerfil = table.Column<string>(type: "varchar(300)", unicode: false, maxLength: 300, nullable: true),
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Interesa__EEBF9AB4E4C61B67", x => x.IdInteresado);
                    table.ForeignKey(
                        name: "FK_Interesado_Direccion",
                        column: x => x.IdDireccion,
                        principalTable: "Direccion",
                        principalColumn: "IdDireccion");
                    table.ForeignKey(
                        name: "FK_Interesado_Usuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "IdUsuario");
                });

            migrationBuilder.CreateTable(
                name: "Profesional",
                columns: table => new
                {
                    IdProfesional = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Apellido = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    IdRubroXProfesional = table.Column<int>(type: "int", nullable: true),
                    Descripcion = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    FotoPerfil = table.Column<string>(type: "varchar(300)", unicode: false, maxLength: 300, nullable: true),
                    FHAlta = table.Column<DateTime>(type: "datetime", nullable: false),
                    FHBaja = table.Column<DateTime>(type: "datetime", nullable: true),
                    IdRating = table.Column<int>(type: "int", nullable: true),
                    IdContacto = table.Column<int>(type: "int", nullable: true),
                    IdDireccion = table.Column<int>(type: "int", nullable: true),
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Profesio__BC490D0AA8B6B4F0", x => x.IdProfesional);
                    table.ForeignKey(
                        name: "FK_Profesional_Contacto",
                        column: x => x.IdContacto,
                        principalTable: "Contacto",
                        principalColumn: "IdContacto");
                    table.ForeignKey(
                        name: "FK_Profesional_Direccion",
                        column: x => x.IdDireccion,
                        principalTable: "Direccion",
                        principalColumn: "IdDireccion");
                    table.ForeignKey(
                        name: "FK_Profesional_Usuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "IdUsuario");
                    table.ForeignKey(
                        name: "Profesional_FK",
                        column: x => x.IdRating,
                        principalTable: "Rating",
                        principalColumn: "IdRating");
                });

            migrationBuilder.CreateTable(
                name: "RubroXProfesional",
                columns: table => new
                {
                    IdRubroXProfesional = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdRubro = table.Column<int>(type: "int", nullable: false),
                    IdProfesional = table.Column<int>(type: "int", nullable: false),
                    FHAlta = table.Column<DateTime>(type: "datetime", nullable: false),
                    FHBaja = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("RubroXProfesional_PK", x => x.IdRubroXProfesional);
                    table.ForeignKey(
                        name: "FK_RubroXProfesional_Profesional",
                        column: x => x.IdProfesional,
                        principalTable: "Profesional",
                        principalColumn: "IdProfesional");
                    table.ForeignKey(
                        name: "FK_RubroXProfesional_Rubro",
                        column: x => x.IdRubro,
                        principalTable: "Rubro",
                        principalColumn: "IdRubro");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Direccion_IdLocalidad",
                table: "Direccion",
                column: "IdLocalidad");

            migrationBuilder.CreateIndex(
                name: "IX_Direccion_IdPais",
                table: "Direccion",
                column: "IdPais");

            migrationBuilder.CreateIndex(
                name: "IX_Direccion_IdProvincia",
                table: "Direccion",
                column: "IdProvincia");

            migrationBuilder.CreateIndex(
                name: "IX_Interesado_IdDireccion",
                table: "Interesado",
                column: "IdDireccion");

            migrationBuilder.CreateIndex(
                name: "IX_Interesado_IdUsuario",
                table: "Interesado",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Localidad_IdProvincia",
                table: "Localidad",
                column: "IdProvincia");

            migrationBuilder.CreateIndex(
                name: "IX_Profesional_IdContacto",
                table: "Profesional",
                column: "IdContacto");

            migrationBuilder.CreateIndex(
                name: "IX_Profesional_IdDireccion",
                table: "Profesional",
                column: "IdDireccion");

            migrationBuilder.CreateIndex(
                name: "IX_Profesional_IdRating",
                table: "Profesional",
                column: "IdRating");

            migrationBuilder.CreateIndex(
                name: "IX_Profesional_IdRubroXProfesional",
                table: "Profesional",
                column: "IdRubroXProfesional");

            migrationBuilder.CreateIndex(
                name: "IX_Profesional_IdUsuario",
                table: "Profesional",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Provincia_IdPais",
                table: "Provincia",
                column: "IdPais");

            migrationBuilder.CreateIndex(
                name: "IX_RubroXProfesional_IdProfesional",
                table: "RubroXProfesional",
                column: "IdProfesional");

            migrationBuilder.CreateIndex(
                name: "IX_RubroXProfesional_IdRubro",
                table: "RubroXProfesional",
                column: "IdRubro");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_IdRol",
                table: "Usuario",
                column: "IdRol");

            migrationBuilder.AddForeignKey(
                name: "FK_Profesional_RubroXProfesional",
                table: "Profesional",
                column: "IdRubroXProfesional",
                principalTable: "RubroXProfesional",
                principalColumn: "IdRubroXProfesional");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Direccion_Localidad",
                table: "Direccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Direccion_Pais",
                table: "Direccion");

            migrationBuilder.DropForeignKey(
                name: "FK__Provincia__PaisI__70DDC3D8",
                table: "Provincia");

            migrationBuilder.DropForeignKey(
                name: "FK_Direccion_Provincia",
                table: "Direccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Profesional_Direccion",
                table: "Profesional");

            migrationBuilder.DropForeignKey(
                name: "FK_Profesional_Usuario",
                table: "Profesional");

            migrationBuilder.DropForeignKey(
                name: "FK_Profesional_Contacto",
                table: "Profesional");

            migrationBuilder.DropForeignKey(
                name: "FK_Profesional_RubroXProfesional",
                table: "Profesional");

            migrationBuilder.DropTable(
                name: "Interesado");

            migrationBuilder.DropTable(
                name: "Localidad");

            migrationBuilder.DropTable(
                name: "Pais");

            migrationBuilder.DropTable(
                name: "Provincia");

            migrationBuilder.DropTable(
                name: "Direccion");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Rol");

            migrationBuilder.DropTable(
                name: "Contacto");

            migrationBuilder.DropTable(
                name: "RubroXProfesional");

            migrationBuilder.DropTable(
                name: "Profesional");

            migrationBuilder.DropTable(
                name: "Rubro");

            migrationBuilder.DropTable(
                name: "Rating");
        }
    }
}
