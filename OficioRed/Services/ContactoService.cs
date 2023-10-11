using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OficioRed.Services
{
    public interface IContactoService
    {
        List<Contacto> GetAll();
        Contacto Get(int id);
        void Create(Contacto contacto);
        void Update(int id, ContactoDTO contactoDTO);
        void Delete(int id);
    }

    public class ContactoService : IContactoService
    {
        private readonly DbOficioRedContext _context;

        public ContactoService(DbOficioRedContext context)
        {
            _context = context;
        }

        public List<Contacto> GetAll()
        {
            return _context.Contactos.ToList();
        }

        public Contacto Get(int id)
        {
            return GetContacto(id);
        }

        public void Create(Contacto contacto)
        {
            _context.Contactos.Add(contacto);
            _context.SaveChanges();
        }

        public void Update(int id, ContactoDTO contactoDTO)
        {
            var contacto = GetContacto(id);

            if (contacto == null)
            {
                throw new KeyNotFoundException("Contacto no encontrado");
            }

            // Actualizar propiedades del contacto
            contacto.Telefono = contactoDTO.Telefono;
            contacto.Email = contactoDTO.Email;
            contacto.Instagram = contactoDTO.Instagram;
            contacto.Facebook = contactoDTO.Facebook;

            _context.Contactos.Update(contacto);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var contacto = GetContacto(id);

            if (contacto != null)
            {
                _context.Contactos.Remove(contacto);
                _context.SaveChanges();
            }
        }

        private Contacto GetContacto(int id)
        {
            return _context.Contactos.FirstOrDefault(c => c.IdContacto == id);
        }
    }
}
