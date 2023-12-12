import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  Tooltip,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WorkIcon from "@mui/icons-material/Work";
import UserIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SearchIcon from "@mui/icons-material/Search";
import { ExitToApp } from "@mui/icons-material";
import logoOficio from "../assets/logo-oficiored.png";
import imagendefault from "../assets/fotodefault.webp";
import { usuarioService } from "../services/usuario.service";
import { sesionService } from "../auth/sesion";
import { useLocation } from "react-router-dom";
import { profesionalService } from "../services/profesional.service";
import { interesadoService } from "../services/interesado.service";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "#1B325F",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#1B325F",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#1B325F",
    },
  }),
}));

export function NavBarLateral({ children, type, logout }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const routesForType = (type) => {
    if (type === "Admin") {
      return [
        {
          text: "Panel de Admin.",
          icon: (
            <SupervisorAccountIcon
              sx={{
                color: currentPath === "/admin/home" ? "#F26C4F" : "#FFFFFF",
              }}
            />
          ),
          route: "/admin/home",
        },
        {
          text: "Admin. de Usuarios",
          icon: (
            <UserIcon
              sx={{
                color:
                  currentPath === "/admin/usuarios" ? "#F26C4F" : "#FFFFFF",
              }}
            />
          ),
          route: "/admin/usuarios",
        },
        {
          text: "Admin. de Rubros",
          icon: (
            <WorkIcon
              sx={{
                color: currentPath === "/admin/rubros" ? "#F26C4F" : "#FFFFFF",
              }}
            />
          ),
          route: "/admin/rubros",
        },
      ];
    } else {
      return [
        {
          text: "Inicio",
          icon: (
            <HomeIcon
              sx={{ color: currentPath === "/home" ? "#F26C4F" : "#FFFFFF" }}
            />
          ),
          route: "/home",
        },
        {
          text: "Profesionales",
          icon: (
            <SearchIcon
              sx={{
                color: currentPath === "/profesionales" ? "#F26C4F" : "#FFFFFF",
              }}
            />
          ),
          route: "/profesionales",
        },
        {
          text: "Favoritos",
          icon: (
            <FavoriteIcon
              sx={{
                color: currentPath === "/favoritos" ? "#F26C4F" : "#FFFFFF",
              }}
            />
          ),
          route: "/favoritos",
        },
      ];
    }
  };

  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const infoPerfil = async () => {
    const id = usuarioService.getId();
    let fotoUsuario = null;

    try {
      const response = await usuarioService.get(Number(id));
      if (response.data.idRol === 2) {
        const profesionales = await profesionalService.getByIdUsuario(id);
        fotoUsuario = profesionales.fotoPerfil;
      } else if (response.data.idRol === 3) {
        const interesados = await interesadoService.getByIdUsuario(id);
        fotoUsuario = interesados.fotoPerfil;
      }
      return fotoUsuario;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return null;
    }
  };

  const [fotoPerfil, setFotoPerfil] = useState("");

  const obtenerFotoPerfil = async () => {
    const fotoPerfilUrl = await infoPerfil();
    setFotoPerfil(fotoPerfilUrl || imagendefault);
  };

  useEffect(() => {
    obtenerFotoPerfil();
  }, []);

  const handleChange = async () => {
    const acceso = await sesionService.getAcceso();
    if (acceso.idRol === 1) {
      navigate(`/admin/${acceso.id}/miPerfilAdmin`);
    } else if (acceso.idRol === 2) {
      navigate(`/${acceso.id}/miPerfilProfesional`);
    } else if (acceso.idRol === 3) {
      navigate(`/${acceso.id}/miPerfilInteresado`);
    } else {
      navigate(`/home`);
    }
    handleClose();
    obtenerFotoPerfil();
  };

  const handleChangeLogout = () => {
    logout();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Link to={"/home"}>
            <img
              src={logoOficio}
              alt="Logo"
              style={{
                height: 40,
                width: "auto",
                borderRadius: 8,
                cursor: "pointer",
              }}
            />
          </Link>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <Tooltip title="Abrir Menu">
              <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                <img
                  src={fotoPerfil || imagendefault}
                  alt="Perfil"
                  style={{
                    borderRadius: "50%",
                    border: "0.5px solid black",
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem textAlign="center" onClick={handleChange}>
                Mi Perfil
              </MenuItem>
              <MenuItem textAlign="center" onClick={handleChangeLogout}>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "#FFFFFF" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "#FFFFFF" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routesForType(type).map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(item.route)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    color: "#F26C4F",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: currentPath === item.route ? "#F26C4F" : "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={logout}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  color: "#F26C4F",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ExitToApp sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Cerrar Sesión"}
                sx={{
                  opacity: open ? 1 : 0,
                  color: "white",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>{children}</Typography>
      </Box>
    </Box>
  );
}
