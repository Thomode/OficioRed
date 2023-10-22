using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Services;

namespace OficioRed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private IRolService _rolService;
        private IMapper _mapper;
        public RolController(IRolService rolService, IMapper mapper) 
        {
            _rolService = rolService;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var roles = _rolService.GetAll();

                var rolesMapeado = new List<RolDTO>();

                _mapper.Map(roles, rolesMapeado);

                return Ok(rolesMapeado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
