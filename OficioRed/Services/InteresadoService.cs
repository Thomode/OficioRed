using OficioRed.Context;
using OficioRed.Helpers;
using OficioRed.Models;
using OficioRed.Dtos;
using AutoMapper;

namespace OficioRed.Services
{
    public interface IInteresadoService
    {
        List<Interesado> GetAll();
        Interesado Get(int id);
        void Create(InteresadoDTO intersadoDTO);
        void Update(int id, UpdateInteresadoDTO updateInteresadoDTO);
        void Delete(int id);
    }

    public class InteresadoService : IInteresadoService
    {
        private readonly DbOficioRedContext _context;
        private readonly IMapper _mapper;
        private readonly IAccesoServicio _accesoServicio;

        public InteresadoService(DbOficioRedContext context, IMapper mapper,IAccesoServicio accesoServicio)
        {
            _context = context;
            _mapper = mapper;
            _accesoServicio = accesoServicio;
        }

        public List<Interesado> GetAll()
        {
            return _context.Interesados.Where(e => !e.Fhbaja.HasValue).ToList();
        }

        public Interesado Get(int id)
        {
            return GetInteresado(id);
        }

        public void Create(InteresadoDTO intersadoDTO)
        {
            string sesion = _accesoServicio.GetUsuario();
            var usuario = _context.Usuarios.FirstOrDefault(usuario => usuario.User == sesion);

            var interesado = new Interesado();
            interesado.Fhalta = DateTime.Now;
            interesado.IdUsuario = usuario.IdUsuario;
            _mapper.Map(intersadoDTO,interesado);
            
            _context.Interesados.Add(interesado);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateInteresadoDTO updateInteresadoDTO)
        {
            var interesado = GetInteresado(id);

            if (interesado == null)
            {
                throw new KeyNotFoundException("Interesado no encontrado");
            }

            _mapper.Map(updateInteresadoDTO, interesado);

            _context.Interesados.Update(interesado);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var interesado = GetInteresado(id);

            if (interesado != null)
            {
                interesado.Fhbaja = DateTime.Now;
                _context.Interesados.Update(interesado);
                _context.SaveChanges();
            }
        }

        private Interesado GetInteresado(int id)
        {
            var interesado = _context.Interesados.Find(id);

            if (interesado == null || interesado.Fhbaja != null)
            {
                throw new KeyNotFoundException("Interesado no encontrado");
            }

            return interesado;
        }
    }
}
