using AutoMapper;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Helpers;
using OficioRed.Models;

namespace OficioRed.Services;

public interface IContactoService
{
    List<Contacto> GetAll();
    Contacto Get(int id);
    void Create(ContactoDTO contactoDTO);
    void Update(int id, ContactoDTO contactoDTO);
    void Delete(int id);
}

public class ContactoService: IContactoService
{
    private DbOficioRedContext _context;
    private IMapper _mapper;
    private IAccesoService _accesoService;

    public ContactoService(DbOficioRedContext context, IMapper mapper, IAccesoService accesoService)
    {
        _context = context;
        _mapper = mapper;
        _accesoService = accesoService;
    }

    public void Create(ContactoDTO contactoDTO)
    {
        var profesional = getProfesionalSesion();

        if (_context.Contactos.Any(e => e.Email == contactoDTO.Email && e.Fhbaja.HasValue))
        {
            throw new AppException("Email ya registrado");
        }

        if (_context.Contactos.Any(e => e.Telefono == contactoDTO.Telefono && e.Fhbaja.HasValue))
        {
            throw new AppException("Telefono ya registrado");
        }

        if (_context.Contactos.Any(e => e.Facebook == contactoDTO.Facebook && e.Fhbaja.HasValue))
        {
            throw new AppException("Facebook ya registrado");
        }

        if (_context.Contactos.Any(e => e.Instagram == contactoDTO.Instagram && e.Fhbaja.HasValue))
        {
            throw new AppException("Instagram ya registrado");
        }

        var contacto = new Contacto();
        contacto.Fhalta = DateTime.Now;
        contacto.IdProfesional = profesional.IdProfesional;

        _mapper.Map(contactoDTO, contacto);

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Contactos.Add(contacto);
                _context.SaveChanges();

                var contactoSave = _context.Contactos.FirstOrDefault(e => e.IdProfesional == profesional.IdProfesional);

                profesional.IdContacto = contactoSave.IdContacto;
                _context.Profesionals.Update(profesional);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al crear el Contacto.", ex);

            }
        }
    }

    public void Delete(int id)
    {
        var contacto = getContactoById(id);

        contacto.Fhbaja = DateTime.Now;

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Contactos.Update(contacto);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al eliminar el contacto.", ex);

            }
        }
    }

    public Contacto Get(int id)
    {
        return getContactoById(id);
    }

    public List<Contacto> GetAll()
    {
        return _context.Contactos.Where(e => !e.Fhbaja.HasValue).ToList();
    }

    public void Update(int id, ContactoDTO contactoDTO)
    {
        var contacto = getContactoById(id);

        if (contacto == null)
        {
            throw new AppException("Es oficio no existe");
        }

        if (_context.Contactos.Any(e => e.Email == contactoDTO.Email && e.Fhbaja.HasValue && e.IdContacto != id))
        {
            throw new AppException("Email ya registrado");
        }

        if (_context.Contactos.Any(e => e.Telefono == contactoDTO.Telefono && e.Fhbaja.HasValue && e.IdContacto != id))
        {
            throw new AppException("Telefono ya registrado");
        }

        if (_context.Contactos.Any(e => e.Facebook == contactoDTO.Facebook && e.Fhbaja.HasValue && e.IdContacto != id))
        {
            throw new AppException("Facebook ya registrado");
        }

        if (_context.Contactos.Any(e => e.Instagram == contactoDTO.Instagram && e.Fhbaja.HasValue && e.IdContacto != id))
        {
            throw new AppException("Instagram ya registrado");
        }

        _mapper.Map(contactoDTO, contacto);

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Contactos.Update(contacto);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al actualizar el contacto.", ex);
            }
        }
    }

    private Contacto getContactoById(int id)
    {
        var contacto = _context.Contactos.Find(id);

        if (contacto == null || contacto.Fhbaja != null)
        {
            throw new KeyNotFoundException("Contacto no encontrado");
        }

        return contacto;
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