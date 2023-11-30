﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OficioRed.Context;

#nullable disable

namespace OficioRed.Migrations
{
    [DbContext(typeof(DbOficioRedContext))]
    partial class DbOficioRedContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("OficioRed.Models.Contacto", b =>
                {
                    b.Property<int>("IdContacto")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdContacto"));

                    b.Property<string>("Email")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Facebook")
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<DateTime?>("Fhalta")
                        .HasColumnType("datetime")
                        .HasColumnName("FHAlta");

                    b.Property<DateTime?>("Fhbaja")
                        .HasColumnType("datetime")
                        .HasColumnName("FHBaja");

                    b.Property<int?>("IdProfesional")
                        .HasColumnType("int");

                    b.Property<string>("Instagram")
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("Telefono")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("IdContacto")
                        .HasName("PK__Contacto__A4D6BBFA9D8BBAD2");

                    b.ToTable("Contacto", (string)null);
                });

            modelBuilder.Entity("OficioRed.Models.Direccion", b =>
                {
                    b.Property<int>("IdDireccion")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdDireccion"));

                    b.Property<string>("Barrio")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Calle")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<DateTime>("Fhalta")
                        .HasColumnType("datetime")
                        .HasColumnName("FHAlta");

                    b.Property<DateTime?>("Fhbaja")
                        .HasColumnType("datetime")
                        .HasColumnName("FHBaja");

                    b.Property<int>("IdLocalidad")
                        .HasColumnType("int");

                    b.Property<int>("IdPais")
                        .HasColumnType("int");

                    b.Property<int>("IdProvincia")
                        .HasColumnType("int");

                    b.HasKey("IdDireccion")
                        .HasName("Direccion_PK");

                    b.HasIndex("IdLocalidad");

                    b.HasIndex("IdPais");

                    b.HasIndex("IdProvincia");

                    b.ToTable("Direccion", (string)null);
                });

            modelBuilder.Entity("OficioRed.Models.Interesado", b =>
                {
                    b.Property<int>("IdInteresado")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdInteresado"));

                    b.Property<string>("Apellido")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Email")
                        .HasMaxLength(80)
                        .IsUnicode(false)
                        .HasColumnType("varchar(80)");

                    b.Property<DateTime>("Fhalta")
                        .HasColumnType("datetime")
                        .HasColumnName("FHAlta");

                    b.Property<DateTime?>("Fhbaja")
                        .HasColumnType("datetime")
                        .HasColumnName("FHBaja");

                    b.Property<string>("FotoPerfil")
                        .HasMaxLength(300)
                        .IsUnicode(false)
                        .HasColumnType("varchar(300)");

                    b.Property<int?>("IdDireccion")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("IdInteresado")
                        .HasName("PK__Interesa__EEBF9AB4E4C61B67");

                    b.HasIndex("IdDireccion");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Interesado", (string)null);
                });

            modelBuilder.Entity("OficioRed.Models.Localidad", b =>
                {
                    b.Property<int>("IdLocalidad")
                        .HasColumnType("int");

                    b.Property<int?>("IdProvincia")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("IdLocalidad")
                        .HasName("PK__Localida__6E289F428C9FC51C");

                    b.HasIndex("IdProvincia");

                    b.ToTable("Localidad", (string)null);
                });

            modelBuilder.Entity("OficioRed.Models.Pais", b =>
                {
                    b.Property<int>("IdPais")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("IdPais")
                        .HasName("PK__Pais__B501E1A5E6831DEB");

                    b.ToTable("Pais");
                });

            modelBuilder.Entity("OficioRed.Models.Profesional", b =>
                {
                    b.Property<int>("IdProfesional")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdProfesional"));

                    b.Property<string>("Apellido")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Descripcion")
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<DateTime>("Fhalta")
                        .HasColumnType("datetime")
                        .HasColumnName("FHAlta");

                    b.Property<DateTime?>("Fhbaja")
                        .HasColumnType("datetime")
                        .HasColumnName("FHBaja");

                    b.Property<string>("FotoPerfil")
                        .HasMaxLength(300)
                        .IsUnicode(false)
                        .HasColumnType("varchar(300)");

                    b.Property<int?>("IdContacto")
                        .HasColumnType("int");

                    b.Property<int?>("IdDireccion")
                        .HasColumnType("int");

                    b.Property<int?>("IdRating")
                        .HasColumnType("int");

                    b.Property<int?>("IdRubroXprofesional")
                        .HasColumnType("int")
                        .HasColumnName("IdRubroXProfesional");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("IdProfesional")
                        .HasName("PK__Profesio__BC490D0AA8B6B4F0");

                    b.HasIndex("IdContacto");

                    b.HasIndex("IdDireccion");

                    b.HasIndex("IdRating");

                    b.HasIndex("IdRubroXprofesional");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Profesional", (string)null);
                });

            modelBuilder.Entity("OficioRed.Models.Provincia", b =>
                {
                    b.Property<int>("IdProvincia")
                        .HasColumnType("int");

                    b.Property<int?>("IdPais")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("IdProvincia")
                        .HasName("PK__Provinci__F7CBC757639E10A0");

                    b.HasIndex("IdPais");

                    b.ToTable("Provincia");
                });

            modelBuilder.Entity("OficioRed.Models.Rating", b =>
                {
                    b.Property<int>("IdRating")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdRating"));

                    b.Property<string>("Comentario")
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<DateTime>("Fhalta")
                        .HasColumnType("datetime")
                        .HasColumnName("FHAlta");

                    b.Property<DateTime?>("Fhbaja")
                        .HasColumnType("datetime")
                        .HasColumnName("FHBaja");

                    b.Property<int?>("IdProfesional")
                        .HasColumnType("int");

                    b.Property<int?>("Puntuacion")
                        .HasColumnType("int");

                    b.HasKey("IdRating")
                        .HasName("PK__Rating__27C557CF5FBDE087");

                    b.ToTable("Rating", (string)null);
                });

            modelBuilder.Entity("OficioRed.Models.Rol", b =>
                {
                    b.Property<int>("IdRol")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdRol"));

                    b.Property<DateTime>("Fhalta")
                        .HasColumnType("datetime")
                        .HasColumnName("FHAlta");

                    b.Property<DateTime?>("Fhbaja")
                        .HasColumnType("datetime")
                        .HasColumnName("FHBaja");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.HasKey("IdRol")
                        .HasName("Rol_PK");

                    b.ToTable("Rol", (string)null);
                });

            modelBuilder.Entity("OficioRed.Models.Rubro", b =>
                {
                    b.Property<int>("IdRubro")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdRubro"));

                    b.Property<DateTime>("Fhalta")
                        .HasColumnType("datetime")
                        .HasColumnName("FHAlta");

                    b.Property<DateTime?>("Fhbaja")
                        .HasColumnType("datetime")
                        .HasColumnName("FHBaja");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.HasKey("IdRubro")
                        .HasName("PK__Oficio__6B0DB913EDD02304");

                    b.ToTable("Rubro", (string)null);
                });

            modelBuilder.Entity("OficioRed.Models.RubroXprofesional", b =>
                {
                    b.Property<int>("IdRubroXprofesional")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("IdRubroXProfesional");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdRubroXprofesional"));

                    b.Property<DateTime>("Fhalta")
                        .HasColumnType("datetime")
                        .HasColumnName("FHAlta");

                    b.Property<DateTime?>("Fhbaja")
                        .HasColumnType("datetime")
                        .HasColumnName("FHBaja");

                    b.Property<int>("IdProfesional")
                        .HasColumnType("int");

                    b.Property<int>("IdRubro")
                        .HasColumnType("int");

                    b.HasKey("IdRubroXprofesional")
                        .HasName("RubroXProfesional_PK");

                    b.HasIndex("IdProfesional");

                    b.HasIndex("IdRubro");

                    b.ToTable("RubroXProfesional", (string)null);
                });

            modelBuilder.Entity("OficioRed.Models.Usuario", b =>
                {
                    b.Property<int>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdUsuario"));

                    b.Property<int>("Activo")
                        .HasColumnType("int");

                    b.Property<DateTime>("Fhalta")
                        .HasColumnType("datetime")
                        .HasColumnName("FHAlta");

                    b.Property<DateTime?>("Fhbaja")
                        .HasColumnType("datetime")
                        .HasColumnName("FHBaja");

                    b.Property<int>("IdRol")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("User")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)")
                        .HasColumnName("Usuario");

                    b.HasKey("IdUsuario")
                        .HasName("Usuario_PK");

                    b.HasIndex("IdRol");

                    b.ToTable("Usuario", (string)null);
                });

            modelBuilder.Entity("OficioRed.Models.Direccion", b =>
                {
                    b.HasOne("OficioRed.Models.Localidad", "IdLocalidadNavigation")
                        .WithMany("Direccions")
                        .HasForeignKey("IdLocalidad")
                        .IsRequired()
                        .HasConstraintName("FK_Direccion_Localidad");

                    b.HasOne("OficioRed.Models.Pais", "IdPaisNavigation")
                        .WithMany("Direccions")
                        .HasForeignKey("IdPais")
                        .IsRequired()
                        .HasConstraintName("FK_Direccion_Pais");

                    b.HasOne("OficioRed.Models.Provincia", "IdProvinciaNavigation")
                        .WithMany("Direccions")
                        .HasForeignKey("IdProvincia")
                        .IsRequired()
                        .HasConstraintName("FK_Direccion_Provincia");

                    b.Navigation("IdLocalidadNavigation");

                    b.Navigation("IdPaisNavigation");

                    b.Navigation("IdProvinciaNavigation");
                });

            modelBuilder.Entity("OficioRed.Models.Interesado", b =>
                {
                    b.HasOne("OficioRed.Models.Direccion", "IdDireccionNavigation")
                        .WithMany("Interesados")
                        .HasForeignKey("IdDireccion")
                        .HasConstraintName("FK_Interesado_Direccion");

                    b.HasOne("OficioRed.Models.Usuario", "IdUsuarioNavigation")
                        .WithMany("Interesados")
                        .HasForeignKey("IdUsuario")
                        .IsRequired()
                        .HasConstraintName("FK_Interesado_Usuario");

                    b.Navigation("IdDireccionNavigation");

                    b.Navigation("IdUsuarioNavigation");
                });

            modelBuilder.Entity("OficioRed.Models.Localidad", b =>
                {
                    b.HasOne("OficioRed.Models.Provincia", "IdProvinciaNavigation")
                        .WithMany("Localidads")
                        .HasForeignKey("IdProvincia")
                        .HasConstraintName("FK__Localidad__Provi__73BA3083");

                    b.Navigation("IdProvinciaNavigation");
                });

            modelBuilder.Entity("OficioRed.Models.Profesional", b =>
                {
                    b.HasOne("OficioRed.Models.Contacto", "IdContactoNavigation")
                        .WithMany("Profesionals")
                        .HasForeignKey("IdContacto")
                        .HasConstraintName("FK_Profesional_Contacto");

                    b.HasOne("OficioRed.Models.Direccion", "IdDireccionNavigation")
                        .WithMany("Profesionals")
                        .HasForeignKey("IdDireccion")
                        .HasConstraintName("FK_Profesional_Direccion");

                    b.HasOne("OficioRed.Models.Rating", "IdRatingNavigation")
                        .WithMany("Profesionals")
                        .HasForeignKey("IdRating")
                        .HasConstraintName("Profesional_FK");

                    b.HasOne("OficioRed.Models.RubroXprofesional", "IdRubroXprofesionalNavigation")
                        .WithMany("Profesionals")
                        .HasForeignKey("IdRubroXprofesional")
                        .HasConstraintName("FK_Profesional_RubroXProfesional");

                    b.HasOne("OficioRed.Models.Usuario", "IdUsuarioNavigation")
                        .WithMany("Profesionals")
                        .HasForeignKey("IdUsuario")
                        .IsRequired()
                        .HasConstraintName("FK_Profesional_Usuario");

                    b.Navigation("IdContactoNavigation");

                    b.Navigation("IdDireccionNavigation");

                    b.Navigation("IdRatingNavigation");

                    b.Navigation("IdRubroXprofesionalNavigation");

                    b.Navigation("IdUsuarioNavigation");
                });

            modelBuilder.Entity("OficioRed.Models.Provincia", b =>
                {
                    b.HasOne("OficioRed.Models.Pais", "IdPaisNavigation")
                        .WithMany("Provincia")
                        .HasForeignKey("IdPais")
                        .HasConstraintName("FK__Provincia__PaisI__70DDC3D8");

                    b.Navigation("IdPaisNavigation");
                });

            modelBuilder.Entity("OficioRed.Models.RubroXprofesional", b =>
                {
                    b.HasOne("OficioRed.Models.Profesional", "IdProfesionalNavigation")
                        .WithMany("RubroXprofesionals")
                        .HasForeignKey("IdProfesional")
                        .IsRequired()
                        .HasConstraintName("FK_RubroXProfesional_Profesional");

                    b.HasOne("OficioRed.Models.Rubro", "IdRubroNavigation")
                        .WithMany("RubroXprofesionals")
                        .HasForeignKey("IdRubro")
                        .IsRequired()
                        .HasConstraintName("FK_RubroXProfesional_Rubro");

                    b.Navigation("IdProfesionalNavigation");

                    b.Navigation("IdRubroNavigation");
                });

            modelBuilder.Entity("OficioRed.Models.Usuario", b =>
                {
                    b.HasOne("OficioRed.Models.Rol", "IdRolNavigation")
                        .WithMany("Usuarios")
                        .HasForeignKey("IdRol")
                        .IsRequired()
                        .HasConstraintName("FK_Usuario_Rol");

                    b.Navigation("IdRolNavigation");
                });

            modelBuilder.Entity("OficioRed.Models.Contacto", b =>
                {
                    b.Navigation("Profesionals");
                });

            modelBuilder.Entity("OficioRed.Models.Direccion", b =>
                {
                    b.Navigation("Interesados");

                    b.Navigation("Profesionals");
                });

            modelBuilder.Entity("OficioRed.Models.Localidad", b =>
                {
                    b.Navigation("Direccions");
                });

            modelBuilder.Entity("OficioRed.Models.Pais", b =>
                {
                    b.Navigation("Direccions");

                    b.Navigation("Provincia");
                });

            modelBuilder.Entity("OficioRed.Models.Profesional", b =>
                {
                    b.Navigation("RubroXprofesionals");
                });

            modelBuilder.Entity("OficioRed.Models.Provincia", b =>
                {
                    b.Navigation("Direccions");

                    b.Navigation("Localidads");
                });

            modelBuilder.Entity("OficioRed.Models.Rating", b =>
                {
                    b.Navigation("Profesionals");
                });

            modelBuilder.Entity("OficioRed.Models.Rol", b =>
                {
                    b.Navigation("Usuarios");
                });

            modelBuilder.Entity("OficioRed.Models.Rubro", b =>
                {
                    b.Navigation("RubroXprofesionals");
                });

            modelBuilder.Entity("OficioRed.Models.RubroXprofesional", b =>
                {
                    b.Navigation("Profesionals");
                });

            modelBuilder.Entity("OficioRed.Models.Usuario", b =>
                {
                    b.Navigation("Interesados");

                    b.Navigation("Profesionals");
                });
#pragma warning restore 612, 618
        }
    }
}
