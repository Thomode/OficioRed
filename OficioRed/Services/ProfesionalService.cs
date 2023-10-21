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
        void Update(int id, ProfesionalDTO profesionalDTO);
        void Delete(int id);
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

            if(sesion == null)
            {
                throw new AppException("Usuario no logeado");
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

        public void Update(int id, ProfesionalDTO profesionalDTO)
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
            var profesional = _context.Profesionals.Find(id);

            if (profesional == null)
                throw new KeyNotFoundException("Profesional no encontrado");

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
    }
}
