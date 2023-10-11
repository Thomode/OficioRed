using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace OficioRed.Services
{
    public interface IAccesoServicio
    {
        string GetUsuario();
        dynamic GetCurrentUsuario();
    }
    public class AccesoServicio : IAccesoServicio
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AccesoServicio(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUsuario()
        {
            string userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            return userId;
           
        }

        public dynamic GetCurrentUsuario()
        {
            var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClains = identity.Claims;

                return new
                {
                    usuario = userClains.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
                    rol = userClains.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value,
                };
            }
            return null;
        }
    }
}
