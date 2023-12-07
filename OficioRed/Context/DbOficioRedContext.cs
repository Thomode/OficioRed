using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using OficioRed.Models;

namespace OficioRed.Context;

public partial class DbOficioRedContext : DbContext
{
    public DbOficioRedContext()
    {
    }

    public DbOficioRedContext(DbContextOptions<DbOficioRedContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Comentario> Comentarios { get; set; }

    public virtual DbSet<Contacto> Contactos { get; set; }

    public virtual DbSet<Direccion> Direccions { get; set; }

    public virtual DbSet<Favorito> Favoritos { get; set; }

    public virtual DbSet<Interesado> Interesados { get; set; }

    public virtual DbSet<Localidad> Localidads { get; set; }

    public virtual DbSet<Pais> Pais { get; set; }

    public virtual DbSet<Profesional> Profesionals { get; set; }

    public virtual DbSet<Provincia> Provincia { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Rubro> Rubros { get; set; }

    public virtual DbSet<RubroXprofesional> RubroXprofesionals { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comentario>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Comentario");

            entity.Property(e => e.Comentario1)
                .HasMaxLength(300)
                .IsUnicode(false)
                .HasColumnName("Comentario");
            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");
            entity.Property(e => e.IdComentario).ValueGeneratedOnAdd();

            entity.HasOne(d => d.IdProfesionalNavigation).WithMany()
                .HasForeignKey(d => d.IdProfesional)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Comentario_Profesional_FK");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany()
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Comentario_Usuario_FK");
        });

        modelBuilder.Entity<Contacto>(entity =>
        {
            entity.HasKey(e => e.IdContacto).HasName("PK__Contacto__A4D6BBFA9D8BBAD2");

            entity.ToTable("Contacto");

            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Facebook).IsUnicode(false);
            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");
            entity.Property(e => e.Instagram).IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Direccion>(entity =>
        {
            entity.HasKey(e => e.IdDireccion).HasName("Direccion_PK");

            entity.ToTable("Direccion");

            entity.HasIndex(e => e.IdLocalidad, "IX_Direccion_IdLocalidad");

            entity.HasIndex(e => e.IdPais, "IX_Direccion_IdPais");

            entity.HasIndex(e => e.IdProvincia, "IX_Direccion_IdProvincia");

            entity.Property(e => e.Barrio)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Calle)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");

            entity.HasOne(d => d.IdLocalidadNavigation).WithMany(p => p.Direccions)
                .HasForeignKey(d => d.IdLocalidad)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Direccion_Localidad");

            entity.HasOne(d => d.IdPaisNavigation).WithMany(p => p.Direccions)
                .HasForeignKey(d => d.IdPais)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Direccion_Pais");

            entity.HasOne(d => d.IdProvinciaNavigation).WithMany(p => p.Direccions)
                .HasForeignKey(d => d.IdProvincia)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Direccion_Provincia");
        });

        modelBuilder.Entity<Favorito>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Favorito");

            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");
            entity.Property(e => e.IdFavorito).ValueGeneratedOnAdd();

            entity.HasOne(d => d.IdProfesionalNavigation).WithMany()
                .HasForeignKey(d => d.IdProfesional)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Favorito_Profesional_FK");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany()
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Favorito_Usuario_FK");
        });

        modelBuilder.Entity<Interesado>(entity =>
        {
            entity.HasKey(e => e.IdInteresado).HasName("PK__Interesa__EEBF9AB4E4C61B67");

            entity.ToTable("Interesado");

            entity.HasIndex(e => e.IdDireccion, "IX_Interesado_IdDireccion");

            entity.HasIndex(e => e.IdUsuario, "IX_Interesado_IdUsuario");

            entity.Property(e => e.Apellido)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");
            entity.Property(e => e.FotoPerfil)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdDireccionNavigation).WithMany(p => p.Interesados)
                .HasForeignKey(d => d.IdDireccion)
                .HasConstraintName("FK_Interesado_Direccion");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Interesados)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Interesado_Usuario");
        });

        modelBuilder.Entity<Localidad>(entity =>
        {
            entity.HasKey(e => e.IdLocalidad).HasName("PK__Localida__6E289F428C9FC51C");

            entity.ToTable("Localidad");

            entity.HasIndex(e => e.IdProvincia, "IX_Localidad_IdProvincia");

            entity.Property(e => e.IdLocalidad).ValueGeneratedNever();
            entity.Property(e => e.Nombre).HasMaxLength(100);

            entity.HasOne(d => d.IdProvinciaNavigation).WithMany(p => p.Localidads)
                .HasForeignKey(d => d.IdProvincia)
                .HasConstraintName("FK__Localidad__Provi__73BA3083");
        });

        modelBuilder.Entity<Pais>(entity =>
        {
            entity.HasKey(e => e.IdPais).HasName("PK__Pais__B501E1A5E6831DEB");

            entity.Property(e => e.IdPais).ValueGeneratedNever();
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Profesional>(entity =>
        {
            entity.HasKey(e => e.IdProfesional).HasName("PK__Profesio__BC490D0AA8B6B4F0");

            entity.ToTable("Profesional");

            entity.HasIndex(e => e.IdContacto, "IX_Profesional_IdContacto");

            entity.HasIndex(e => e.IdDireccion, "IX_Profesional_IdDireccion");

            entity.HasIndex(e => e.IdRating, "IX_Profesional_IdRating");

            entity.HasIndex(e => e.IdUsuario, "IX_Profesional_IdUsuario");

            entity.Property(e => e.Apellido)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion).IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");
            entity.Property(e => e.FotoPerfil)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdContactoNavigation).WithMany(p => p.Profesionals)
                .HasForeignKey(d => d.IdContacto)
                .HasConstraintName("FK_Profesional_Contacto");

            entity.HasOne(d => d.IdDireccionNavigation).WithMany(p => p.Profesionals)
                .HasForeignKey(d => d.IdDireccion)
                .HasConstraintName("FK_Profesional_Direccion");

            entity.HasOne(d => d.IdRatingNavigation).WithMany(p => p.Profesionals)
                .HasForeignKey(d => d.IdRating)
                .HasConstraintName("Profesional_FK");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Profesionals)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Profesional_Usuario");
        });

        modelBuilder.Entity<Provincia>(entity =>
        {
            entity.HasKey(e => e.IdProvincia).HasName("PK__Provinci__F7CBC757639E10A0");

            entity.HasIndex(e => e.IdPais, "IX_Provincia_IdPais");

            entity.Property(e => e.IdProvincia).ValueGeneratedNever();
            entity.Property(e => e.Nombre).HasMaxLength(100);

            entity.HasOne(d => d.IdPaisNavigation).WithMany(p => p.Provincia)
                .HasForeignKey(d => d.IdPais)
                .HasConstraintName("FK__Provincia__PaisI__70DDC3D8");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.IdRating).HasName("PK__Rating__27C557CF5FBDE087");

            entity.ToTable("Rating");

            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("Rol_PK");

            entity.ToTable("Rol");

            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Rubro>(entity =>
        {
            entity.HasKey(e => e.IdRubro).HasName("PK__Oficio__6B0DB913EDD02304");

            entity.ToTable("Rubro");

            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RubroXprofesional>(entity =>
        {
            entity.HasKey(e => e.IdRubroXprofesional).HasName("RubroXProfesional_PK");

            entity.ToTable("RubroXProfesional");

            entity.HasIndex(e => e.IdProfesional, "IX_RubroXProfesional_IdProfesional");

            entity.HasIndex(e => e.IdRubro, "IX_RubroXProfesional_IdRubro");

            entity.Property(e => e.IdRubroXprofesional).HasColumnName("IdRubroXProfesional");
            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");

            entity.HasOne(d => d.IdProfesionalNavigation).WithMany(p => p.RubroXprofesionals)
                .HasForeignKey(d => d.IdProfesional)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RubroXProfesional_Profesional");

            entity.HasOne(d => d.IdRubroNavigation).WithMany(p => p.RubroXprofesionals)
                .HasForeignKey(d => d.IdRubro)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RubroXProfesional_Rubro");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("Usuario_PK");

            entity.ToTable("Usuario");

            entity.HasIndex(e => e.IdRol, "IX_Usuario_IdRol");

            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");
            entity.Property(e => e.Password)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.User)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("Usuario");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Usuario_Rol");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
