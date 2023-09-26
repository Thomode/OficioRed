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
                   Usuario1 = "gaston",
                   Password="123456",
                   Rol="empleado"
               },
               new  Usuario
               {
                   IdUsuario = 2,
                   Usuario1 = "tomas",
                   Password="123456",
                   Rol="empleado"
               },
              new  Usuario
               {
                   IdUsuario = 3,
                   Usuario1 = "martin",
                   Password="123456",
                   Rol="admin"
               }
            };
            return list;
        }
    }
}
