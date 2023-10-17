import { useEffect, useState } from "react";
import { TablaUsuario } from "../components/Usuario/TablaUsuario";
import { usuarioService } from "../services/usuario.service";
import { Button, Grid, TextField, Typography , Card, CardContent} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import  Buscador  from "../components/buscador";
export function UsuarioAdminPage() {
    const handleSearch = async () => {
        const data = await usuarioService.getAll(); // Obt�n todos los usuarios
        console.log(data)
        const filteredUsuarios = data.filter((usuario) =>
            usuario.user.toLowerCase().includes(searchValue.toLowerCase())
        ); // Filtra los usuarios basados en el texto de b�squeda

        setUsuarios(filteredUsuarios); // Actualiza la lista de usuarios con el resultado de la b�squeda
    };
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("");

  async function loadUsuarios() {
    const data = await usuarioService.getAll();
    console.log(data);

    setUsuarios(data);
  }

  useEffect(() => {
    loadUsuarios();
  }, []);

  return (
    <>
          <Card>
              <CardContent>
                  <Typography variant="h4" marginBottom={2}>
                      Usuarios
                  </Typography>
                  <Grid
                      container
                      spacing={3}
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                          marginBottom: "10px",
                      }}
                  >
                      <Grid item xs={6}>
                          <Buscador searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />
                      </Grid>
                      <Grid item>
                          <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => { navigate('/admin/usuariosForm') }}>
                              Agregar
                          </Button>
                      </Grid>
                  </Grid>
                  <TablaUsuario usuarios={usuarios} loadUsuarios={loadUsuarios}></TablaUsuario>
              </CardContent>
          </Card>
    </>
  );
}
