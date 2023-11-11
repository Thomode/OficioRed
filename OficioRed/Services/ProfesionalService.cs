using AutoMapper;
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
        List<Profesional> GetAll();
        Profesional Get(int id);
        void Create(ProfesionalDTO profesionalDTO);
        void Update(ProfesionalDTO profesionalDTO);
        void Delete(int id);
        void AsociarRubro(int rubroId);
        List<Rubro> GetRubrosXProfesional(int idProfesional);
        Task<Profesional> SubirFotoPerfil(Stream archivo, string nombreFoto);
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

        public List<Profesional> GetAll()
        {
            return _context.Profesionals.Where(e => !e.Fhbaja.HasValue).ToList();
        }


        public Profesional Get(int id)
        {
            var profesional = _context.Profesionals.Find(id);

            if (profesional == null || profesional.Fhbaja != null)
            {
                throw new KeyNotFoundException("Interesado no encontrado");
            }

            return profesional;
        }

        public void Create(ProfesionalDTO profesionalDTO)
        {
            // Validar datos de entrada (profesionalDTO)
            var sesion = _accesoService.GetCurrentUsuario();
            Console.WriteLine(sesion.ToString());

            if(sesion == null)
            {
                throw new AppException("Usuario no logeado");
            }

            if (_context.Profesionals.Any(e => e.Email == profesionalDTO.Email))
            {
                throw new AppException("Email de profesional ya registrado");
            }

            if (sesion.IdRol != 3)
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

            var rubro = _context.Rubros.Find(rubroId); // Asegúrate de tener una tabla 'Rubros' en tu base de datos

            if (rubro == null)
            {
                throw new KeyNotFoundException("Rubro no encontrado");
            }

            // Realizar las validaciones o lógica adicional si es necesario
            var rubroXProfesional = new RubroXprofesional();

            rubroXProfesional.IdProfesional = profesional.IdProfesional;
            rubroXProfesional.IdRubro = rubro.IdRubro;
            rubroXProfesional.Fhalta = DateTime.Now;
            

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Realiza tus operaciones de base de datos aquí
                    _context.RubroXprofesionals.Add(rubroXProfesional);      
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


        public void Update(ProfesionalDTO profesionalDTO)
        {
            var profesional = getProfesionalSesion();

            if (profesional == null)
            {
                throw new AppException("El Usuario no esta logeado");
            }

            _mapper.Map(profesionalDTO, profesional);

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
                .ToList();

            return rubros.Where(e => !e.Fhbaja.HasValue).ToList();
        }
    }
}
    