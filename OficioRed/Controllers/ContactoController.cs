using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Models;
using OficioRed.Services;
using System;
using System.Collections.Generic;

namespace OficioRed.Controllers
{
    [ApiController]
    [Route("api/contactos")]
    public class ContactoController : ControllerBase
    {
        private readonly IContactoService _contactoService;

        public ContactoController(IContactoService contactoService)
        {
            _contactoService = contactoService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var contactos = _contactoService.GetAll();
                return Ok(contactos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var contacto = _contactoService.Get(id);
                return Ok(contacto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Create(ContactoDTO contactoDTO)
        {
            try
            {
                var contacto = new Contacto
                {
                    Telefono = contactoDTO.Telefono,
                    Email = contactoDTO.Email,
                    Instagram = contactoDTO.Instagram,
                    Facebook = contactoDTO.Facebook
                };

                _contactoService.Create(contacto);
                return Ok(new { message = "Contacto creado" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, ContactoDTO contactoDTO)
        {
            try
            {
                _contactoService.Update(id, contactoDTO);
                return Ok(new { message = "Contacto actualizado" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _contactoService.Delete(id);
                return Ok(new { message = "Contacto eliminado" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
