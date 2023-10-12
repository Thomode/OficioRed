using AutoMapper;
using OficioRed.Context;
using OficioRed.Dtos;
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
        private readonly IAccesoServicio _accesoServicio;

        public ProfesionalService(DbOficioRedContext context, IMapper mapper, IAccesoServicio accesoServicio)
        {
            _context = context;
            _mapper = mapper;
            _accesoServicio = accesoServicio;
        }

        public List<Profesional> GetAll()
        {
            return _context.Profesionales.ToList();
        }

        public Profesional Get(int id)
        {
            return _context.Profesionales.Find(id);
        }

        public void Create(ProfesionalDTO profesionalDTO)
        {
            // Validar datos de entrada (profesionalDTO)

            string sesion = _accesoServicio.GetUsuario();
            var usuario = _context.Usuarios.FirstOrDefault(usuario => usuario.User == sesion);

            // Validar usuario y otros datos necesarios

            var profesional = _mapper.Map<ProfesionalDTO, Profesional>(profesionalDTO);
            profesional.Fhalta = DateTime.Now;
            profesional.IdUsuario = usuario.IdUsuario;

            // Iniciar transacción si es necesario

            try
            {
                _context.Profesionales.Add(profesional);
                _context.SaveChanges();

                
            }
            catch (Exception ex)
            {
                
                
                throw new Exception("Error al crear el profesional.", ex);
            }
        }

        public void Update(int id, ProfesionalDTO profesionalDTO)
        {
            // Validar datos de entrada (profesionalDTO)

            var profesional = _context.Profesionales.Find(id);
            if (profesional == null)
                throw new KeyNotFoundException("Profesional no encontrado");

            // Validar otros datos si es necesario

            _mapper.Map(profesionalDTO, profesional);

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar el profesional.", ex);
            }
        }

        public void Delete(int id)
        {
            var profesional = _context.Profesionales.Find(id);
            if (profesional == null)
                throw new KeyNotFoundException("Profesional no encontrado");

            try
            {
                _context.Profesionales.Remove(profesional);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el profesional.", ex);
            }
        }
    }
}
