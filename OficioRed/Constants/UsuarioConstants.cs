using OficioRed.Models;

namespace OficioRed.Constants
{
    public class UsuarioConstants
    {
        public static List<Usuario> Usuarios()
        {
            var list = new List<Usuario>()
            {
               new  Usuario
               {
                   IdUsuario = 1,
                   User = "gaston",
                   Password="123456",
                   IdRol = 1
               },
               new  Usuario
               {
                   IdUsuario = 2,
                   User = "tomas",
                   Password="123456",
                   IdRol = 1
               },
              new  Usuario
               {
                   IdUsuario = 3,
                   User = "martin",
                   Password="123456",
                   IdRol = 1
               }
            };
            return list;
        }
    }
}
