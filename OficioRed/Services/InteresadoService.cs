﻿using AutoMapper;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Helpers;
using OficioRed.Models;

namespace OficioRed.Services;

public interface IInteresadoService
{
    List<Interesado> GetAll();
    Interesado Get(int id);
    Interesado GetByIdUsuario(int idUsuario);
    void Create(InteresadoDTO interesadoDTO);
    void Update(InteresadoUpdateDTO interesadoUpdateDTO);
    void Delete(int id);
    Task<Interesado> SubirFotoPerfil(Stream archivo, string nombreFoto);
}

public class InteresadoService : IInteresadoService
{
    private DbOficioRedContext _context;
    private IMapper _mapper;
    private IAccesoService _accesoService;

    public InteresadoService(DbOficioRedContext context, IMapper mapper, IAccesoService accesoService)
    {
        _context = context;
        _mapper = mapper;
        _accesoService = accesoService;
    }

    public void Create(InteresadoDTO interesadoDTO)
    {
        var sesion = _accesoService.GetCurrentUsuario();

        if (sesion == null)
        {
            throw new AppException("Usuario no logeado");
        }

        if (_context.Interesados.Any(e => e.Email == interesadoDTO.Email))
        {
            throw new AppException("Email de interesado ya registrado");
        }

        if(sesion.IdRol != 3)
        {
            throw new AppException("El usuario no tiene el rol de interesado");
        }

        var interesado = new Interesado();
        interesado.IdUsuario = sesion.Id;
        interesado.Fhalta = DateTime.Now;

        _mapper.Map(interesadoDTO, interesado);

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Interesados.Add(interesado);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al crear el interesado.", ex);
            }
        }
    }

    public void Delete(int id)
    {
        var interesado = getInteresadoSesion();

        if (interesado == null)
        {
            throw new AppException("El Usuario no esta logeado");
        }

        interesado.Fhbaja = DateTime.Now;

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Interesados.Remove(interesado);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al eliminar el interesado.", ex);

            }
        }
    }

    public Interesado Get(int id)
    {
        return getInteresado(id);
    }

    public List<Interesado> GetAll()
    {
        return _context.Interesados.Where(e => !e.Fhbaja.HasValue).ToList();
    }

    public void Update(InteresadoUpdateDTO interesadoUpdateDTO)
    {
        var interesado = getInteresadoSesion();

        if (interesado == null)
        {
            throw new AppException("El Usuario no esta logeado");
        }

        _mapper.Map(interesadoUpdateDTO, interesado);

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Interesados.Update(interesado);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al actualizar el interesado.", ex);

            }
        }
    }

    private Interesado? getInteresado(int id)
    {
        var interesado = _context.Interesados.Find(id);

        if (interesado == null || interesado.Fhbaja != null)
        {
            throw new KeyNotFoundException("Interesado no encontrado");
        }

        return interesado;
    }

    private Interesado? getInteresadoSesion()
    {
        var sesion = _accesoService.GetCurrentUsuario();

        var interesado = _context.Interesados.FirstOrDefault(e => e.IdUsuario == sesion.Id);

        if (interesado == null || interesado.Fhbaja != null)
        {
            throw new KeyNotFoundException("Interesado no encontrado");
        }

        return interesado;
    }

    public async Task<Interesado> SubirFotoPerfil(Stream archivo, string nombreFoto)
    {
        var interesado = getInteresadoSesion();

        if (interesado == null)
        {
            throw new AppException("El Usuario no esta logeado");
        }

        var firebaseStorage = new FirebaseStorageManeger();

        string nombre = interesado.IdUsuario + "-" + nombreFoto;

        interesado.FotoPerfil = await firebaseStorage.SubirStorage(archivo, nombre);

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Interesados.Update(interesado);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al actualizar el interesado.", ex);

            }
        }
        return interesado;
    }

    public Interesado GetByIdUsuario(int idUsuario)
    {
        var interesado = _context.Interesados.FirstOrDefault(e => e.IdUsuario == idUsuario && !e.Fhbaja.HasValue);

        if(interesado == null)
        {
            throw new KeyNotFoundException("Interesado no encontrado");
        }

        return interesado;
    }
}