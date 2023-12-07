﻿import { useEffect, useState } from "react";
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
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WorkIcon from "@mui/icons-material/Work";
import UserIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SearchIcon from "@mui/icons-material/Search";
import { ExitToApp } from "@mui/icons-material";
import logoOficio from "../assets/logo-oficiored.png";
import imagendefault from "../assets/fotodefault.webp";
import { usuarioService } from "../services/usuario.service";
import { sesionService } from "../auth/sesion";
import axios from "axios";

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
  const routesForType = (type) => {
    if (type === "Admin") {
      return [
        {
          text: "Panel de Admin.",
          icon: <SupervisorAccountIcon sx={{ color: "#FFFFFF" }} />,
          route: "/admin/home",
        },
        {
          text: "Admin. de Usuarios",
          icon: <UserIcon sx={{ color: "#FFFFFF" }} />,
          route: "/admin/usuarios",
        },
        {
          text: "Admin. de Rubros",
          icon: <WorkIcon sx={{ color: "#FFFFFF" }} />,
          route: "/admin/rubros",
        },
      ];
    } else {
      return [
        {
          text: "Inicio",
          icon: <HomeIcon sx={{ color: "#FFFFFF" }} />,
          route: "/home",
        },
        {
          text: "Profesionales",
          icon: <SearchIcon sx={{ color: "#FFFFFF" }} />,
          route: "/profesionales",
        },
        {
          text: "Favoritos",
          icon: <BookmarksOutlinedIcon sx={{ color: "#FFFFFF" }} />,
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

      let profesionalId = null;
      let interesadoId = null;

      if (response.data.idRol === 2) {
        const profesionales = await axios.get("/api/Profesional");
        for (const profesional of profesionales.data) {
          if (profesional.idUsuario === id) {
            profesionalId = profesional.idProfesional;
            break;
          }
        }
        if (profesionalId) {
          const profesionalResponse = await axios.get(
            `/api/Profesional/${profesionalId}`
          );
          fotoUsuario = profesionalResponse.data.fotoPerfil;
        }
      } else if (response.data.idRol === 3) {
        const interesados = await axios.get("/api/Interesado");
        for (const interesado of interesados.data) {
          if (interesado.idUsuario === id) {
            interesadoId = interesado.idInteresado;
            break;
          }
        }
        if (interesadoId) {
          const interesadoResponse = await axios.get(
            `/api/Interesado/${interesadoId}`
          );
          fotoUsuario = interesadoResponse.data.fotoPerfil;
        }
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
          <div style={{ marginLeft: "auto" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
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
            <Menu
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
              <MenuItem onClick={handleChange}>Mi Perfil</MenuItem>
              <MenuItem onClick={handleChangeLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </div>
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
                    color: "#9cc4e4",
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
                    color: "white",
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
                  color: "#9cc4e4",
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
