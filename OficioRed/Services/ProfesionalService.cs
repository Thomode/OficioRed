using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Helpers;
using OficioRed.Models;
using System;
using System.Collections.Generic;

namespace OficioRed.Services
{
    public interface IProfesionalService
    {
        List<ProfesionalResDTO> GetAll();
        Profesional Get(int id);
        Profesional GetByIdUsuario(int idUsuario);
        void Create(ProfesionalDTO profesionalDTO);
        void Update(ProfesionalUpdateDTO profesionalUpdateDTO);
        void Delete(int id);
        void AsociarRubro(int rubroId);
        void DesasociarRubro(int rubroId);
        List<Rubro> GetRubrosXProfesional(int idProfesional);
        Task<Profesional> SubirFotoPerfil(Stream archivo, string nombreFoto);
        List<RubroXprofesional> GetRubros();
    }

    public class ProfesionalService : IProfesionalService
    {
        private readonly DbOficioRedContext _context;
        private readonly IMapper _mapper;
        private readonly IAccesoService _accesoService;

        public ProfesionalService(DbOficioRedContext context, IMapper mapper, IAccesoService accesoServicio)
        {
            _context = context;
            _mapper = mapper;
            _accesoService = accesoServicio;
        }

        public List<ProfesionalResDTO> GetAll()
        {
            var profesionales = _context.Profesionals
                .Where(e => !e.Fhbaja.HasValue)
                .Include(p => p.RubroXprofesionals)
                .AsNoTracking()
                .ToList();


            var rubros = _context.Rubros.Where(e => !e.Fhbaja.HasValue).ToList();

            var profesionalesResDTO = profesionales.Select(profesional =>
                new ProfesionalResDTO
                {
                    IdProfesional = profesional.IdProfesional,
                    Nombre = profesional.Nombre,
                    Apellido = profesional.Apellido,
                    FotoPerfil = profesional.FotoPerfil,
                    Email = profesional.Email,
                    Descripcion = profesional.Descripcion,
                    IdContacto = profesional.IdContacto,
                    IdDireccion = profesional.IdDireccion,
                    IdUsuario = profesional.IdUsuario,
                    IdRating = profesional.IdRating,
                    Rubros = profesional.RubroXprofesionals
                                .Where(rp => !rp.Fhbaja.HasValue)
                                .Select(rp => getRubroDelListado(rp.IdRubro, rubros))
                                .Where(r => r != null)
                                .ToList()
                      

                }).ToList();

            return profesionalesResDTO;
        }

        private Rubro getRubroDelListado(int idRubro, List<Rubro> rubros)
        {
            return rubros.FirstOrDefault(e => e.IdRubro == idRubro);
       
        }


        public Profesional Get(int id)
        {
            var profesional = _context.Profesionals.Find(id);

            if (profesional == null || profesional.Fhbaja != null)
            {
                throw new KeyNotFoundException("Profesional no encontrado");
            }

            return profesional;
        }

        public void Create(ProfesionalDTO profesionalDTO)
        {
            // Validar datos de entrada (profesionalDTO)
            var sesion = _accesoService.GetCurrentUsuario();

            if(sesion == null)
            {
                throw new AppException("Usuario no logeado");
            }

            if (_context.Profesionals.Any(e => e.Email == profesionalDTO.Email))
            {
                throw new AppException("Email de profesional ya registrado");
            }

            if (sesion.IdRol != 2)
            {
                throw new AppException("El usuario no tiene el rol de profesional");
            }

            // crear el objeto profesional con sus datos
            var profesional = new Profesional();
            profesional.IdUsuario = sesion.Id;
            profesional.Fhalta = DateTime.Now;

            _mapper.Map(profesionalDTO, profesional);

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Realiza tus operaciones de base de datos aquí
   
                    _context.Profesionals.Add(profesional);
                    _context.SaveChanges();

                    // Si todo va bien, haz un commit
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    // Si ocurre un error, realiza un rollback
                    transaction.Rollback();
                    throw new Exception("Error al crear el profesional.", ex);
                
                }
            }
        }

        public void AsociarRubro(int rubroId)
        {
            // Buscar al profesional asociado al usuario actual
            var profesional = getProfesionalSesion();

            if (profesional == null)
            {
                throw new KeyNotFoundException("Profesional no encontrado");
            }

            // Asegúrate de tener una tabla 'Rubros' en tu base de datos
            var rubro = _context.Rubros.Find(rubroId);

            if (rubro == null)
            {
                throw new KeyNotFoundException("Rubro no encontrado");
            }

            //Buscar si el rubro esta asociado al profesional
            var rubroXProfesional = _context.RubroXprofesionals
                .FirstOrDefault(e => e.IdProfesional == profesional.IdProfesional && e.IdRubro == rubro.IdRubro && !e.Fhbaja.HasValue);

            if (rubroXProfesional != null)
            {
                throw new KeyNotFoundException("Rubro ya asociado al profesional");
            }


            // Realizar las validaciones o lógica adicional si es necesario
            var rubroXProfesionalNuevo = new RubroXprofesional();

            rubroXProfesionalNuevo.IdProfesional = profesional.IdProfesional;
            rubroXProfesionalNuevo.IdRubro = rubro.IdRubro;
            rubroXProfesionalNuevo.Fhalta = DateTime.Now;
            

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Realiza tus operaciones de base de datos aquí
                    _context.RubroXprofesionals.Add(rubroXProfesionalNuevo);      
                    _context.SaveChanges();

                    // Si todo va bien, haz un commit
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    // Si ocurre un error, realiza un rollback
                    transaction.Rollback();
                    throw new Exception("Error al asociar el rubro al profesional.", ex);
                }
            }
        }

        public void DesasociarRubro(int rubroId)
        {
            var profesional = getProfesionalSesion();

            if (profesional == null)
            {
                throw new KeyNotFoundException("Profesional no encontrado");
            }

            // Asegúrate de tener una tabla 'Rubros' en tu base de datos
            var rubro = _context.Rubros.Find(rubroId); 

            if (rubro == null)
            {
                throw new KeyNotFoundException("Rubro no encontrado");
            }

            //Buscar si el rubro esta asociado al profesional
            var rubroXProfesional = _context.RubroXprofesionals
                .FirstOrDefault(e => e.IdProfesional == profesional.IdProfesional && e.IdRubro == rubro.IdRubro && !e.Fhbaja.HasValue);

            if (rubroXProfesional == null)
            {
                throw new KeyNotFoundException("Rubro no asociado al profesional");
            }

            rubroXProfesional.Fhbaja = DateTime.Now;

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Realiza tus operaciones de base de datos aquí
                    _context.RubroXprofesionals.Update(rubroXProfesional);
                    _context.SaveChanges();

                    // Si todo va bien, haz un commit
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    // Si ocurre un error, realiza un rollback
                    transaction.Rollback();
                    throw new Exception("Error al asociar el rubro al profesional.", ex);
                }
            }
        }


        public void Update(ProfesionalUpdateDTO profesionalUpdateDTO)
        {
            var profesional = getProfesionalSesion();

            if (profesional == null)
            {
                throw new AppException("El Usuario no esta logeado");
            }

            _mapper.Map(profesionalUpdateDTO, profesional);

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Realiza tus operaciones de base de datos aquí
                    _context.Profesionals.Update(profesional);
                    _context.SaveChanges();

                    // Si todo va bien, haz un commit
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    // Si ocurre un error, realiza un rollback
                    transaction.Rollback();
                    throw new Exception("Error al actualizar el profesional.", ex);

                }
            }
        }

        public void Delete(int id)
        {
            var profesional = getProfesionalSesion();

            if (profesional == null)
            {
                throw new AppException("El Usuario no esta logeado");
            }

            profesional.Fhbaja = DateTime.Now;

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Realiza tus operaciones de base de datos aquí

                    _context.Profesionals.Update(profesional);
                    _context.SaveChanges();

                    // Si todo va bien, haz un commit
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    // Si ocurre un error, realiza un rollback
                    transaction.Rollback();
                    throw new Exception("Error al eliminar el profesional.", ex);

                }
            }
        }

        private Profesional? getProfesionalSesion()
        {
            var sesion = _accesoService.GetCurrentUsuario();

            var profesional = _context.Profesionals.FirstOrDefault(e => e.IdUsuario == sesion.Id);

            if (profesional == null || profesional.Fhbaja != null)
            {
                throw new KeyNotFoundException("Profesional no encontrado");
            }

            return profesional;
        }

        public async Task<Profesional> SubirFotoPerfil(Stream archivo, string nombreFoto)
        {
            var profesional = getProfesionalSesion();

            if (profesional == null)
            {
                throw new AppException("El Usuario no esta logeado");
            }

            var firebaseStorage = new FirebaseStorageManeger();

            string nombre = profesional.IdUsuario + "-" + nombreFoto;

            profesional.FotoPerfil = await firebaseStorage.SubirStorage(archivo, nombre);      

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Realiza tus operaciones de base de datos aquí
                    _context.Profesionals.Update(profesional);
                    _context.SaveChanges();

                    // Si todo va bien, haz un commit
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    // Si ocurre un error, realiza un rollback
                    transaction.Rollback();
                    throw new Exception("Error al actualizar el profesional.", ex);

                }
            }
            return profesional;
        }

        public List<Rubro> GetRubrosXProfesional(int idProfesional)
        {
            var rubros = _context.RubroXprofesionals
                .Where(rp => rp.IdProfesional == idProfesional && !rp.Fhbaja.HasValue)
                .Select(rp => rp.IdRubroNavigation)
                .Where(e => !e.Fhbaja.HasValue)
                .ToList();

            return rubros;
        }

        public List<RubroXprofesional> GetRubros()
        {
            return _context.RubroXprofesionals
                .Where(e => !e.Fhbaja.HasValue)
                .Include(e => e.IdRubroNavigation)
                .ToList();
        }

        public Profesional GetByIdUsuario(int idUsuario)
        {
            var profesional = _context.Profesionals.FirstOrDefault(e => e.IdUsuario == idUsuario && !e.Fhbaja.HasValue);

            if (profesional == null)
            {
                throw new KeyNotFoundException("Profesional no encontrado");
            }

            return profesional;
        }
    }
}
    