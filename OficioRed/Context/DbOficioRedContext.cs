using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using OficioRed.Models;

namespace OficioRed.Context;

public partial class DbOficioRedContext : DbContext
{

    public DbOficioRedContext(DbContextOptions<DbOficioRedContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Contacto> Contactos { get; set; }

    public virtual DbSet<Direccion> Direccions { get; set; }

    public virtual DbSet<Interesado> Interesados { get; set; }

    public virtual DbSet<Oficio> Oficios { get; set; }

    public virtual DbSet<OficioProfesion> OficioProfesions { get; set; }

    public virtual DbSet<Profesional> Profesionals { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contacto>(entity =>
        {
            entity.HasKey(e => e.IdContacto).HasName("PK__Contacto__A4D6BBFA9D8BBAD2");

            entity.ToTable("Contacto");

            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Facebook).IsUnicode(false);
            entity.Property(e => e.Instagram).IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Direccion>(entity =>
        {
            entity.HasKey(e => e.IdDireccion).HasName("PK__Direccio__1F8E0C76B04B7555");

            entity.ToTable("Direccion");

            entity.Property(e => e.Barrio).HasMaxLength(100);
            entity.Property(e => e.Calle).HasMaxLength(255);
            entity.Property(e => e.Ciudad).HasMaxLength(100);
            entity.Property(e => e.CodigoPostal).HasMaxLength(20);
            entity.Property(e => e.Estado).HasMaxLength(100);
            entity.Property(e => e.Localidad).HasMaxLength(100);
            entity.Property(e => e.Pais).HasMaxLength(100);
        });

        modelBuilder.Entity<Interesado>(entity =>
        {
            entity.HasKey(e => e.IdInteresado).HasName("PK__Interesa__EEBF9AB4E4C61B67");

            entity.ToTable("Interesado");

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
            entity.Property(e => e.FotoPerfil).IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdContactoNavigation).WithMany(p => p.Interesados)
                .HasForeignKey(d => d.IdContacto)
                .HasConstraintName("FK_Interesado_Contacto");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Interesados)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Interesado_Usuario");
        });

        modelBuilder.Entity<Oficio>(entity =>
        {
            entity.HasKey(e => e.IdOficio).HasName("PK__Oficio__6B0DB913EDD02304");

            entity.ToTable("Oficio");

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

        modelBuilder.Entity<OficioProfesion>(entity =>
        {
            entity.HasKey(e => e.IdOficio).HasName("PK__OficioPr__6B0DB91311DDD7D8");

            entity.ToTable("OficioProfesion");

            entity.Property(e => e.IdOficio).ValueGeneratedOnAdd();

            entity.HasOne(d => d.IdOficioNavigation).WithOne(p => p.OficioProfesion)
                .HasForeignKey<OficioProfesion>(d => d.IdOficio)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OficioProfesion_Oficio");

            entity.HasOne(d => d.IdProfesionalNavigation).WithMany(p => p.OficioProfesions)
                .HasForeignKey(d => d.IdProfesional)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OficioProfesion_Profesional");
        });

        modelBuilder.Entity<Profesional>(entity =>
        {
            entity.HasKey(e => e.IdProfesional).HasName("PK__Profesio__BC490D0AA8B6B4F0");

            entity.ToTable("Profesional");

            entity.Property(e => e.Apellido)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion).IsUnicode(false);
            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");
            entity.Property(e => e.FotoPerfil)
                .HasMaxLength(50)
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
                .HasConstraintName("FK_Profesional_Rating");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Profesionals)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Profesional_Usuario");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.IdRating).HasName("PK__Rating__27C557CF5FBDE087");

            entity.ToTable("Rating");

            entity.Property(e => e.Comentario).IsUnicode(false);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__5B65BF97BD069F1C");

            entity.ToTable("Usuario");

            entity.Property(e => e.Fhalta)
                .HasColumnType("datetime")
                .HasColumnName("FHAlta");
            entity.Property(e => e.Fhbaja)
                .HasColumnType("datetime")
                .HasColumnName("FHBaja");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Rol)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.User)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Usuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
