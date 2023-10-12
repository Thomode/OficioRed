import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import WorkIcon from "@mui/icons-material/Work";
import UserIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import logoOficio from "../assets/logo-oficiored.png";

import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { ExitToApp } from "@mui/icons-material";

import { useUser } from "../auth/useUser";

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
  // necessary for content to be below app bar
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
  backgroundColor: "#1B325F", // Cambia el color de fondo a #1B325F
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
      ...openedMixin(theme), // Establece el estilo del papel cuando el cajón está abierto
      backgroundColor: "#1B325F", // Cambia el color de fondo a #1B325F
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme), // Establece el estilo del papel cuando el cajón está cerrado
      backgroundColor: "#1B325F", // Cambia el color de fondo a #1B325F
    },
  }),
}));

const logout = () => {
  // Eliminar el token del localStorage
  window.localStorage.removeItem("token");
  // Muestro que se elimino correctamente
  alert("Se elimino el token correctamente");
};

export function NavBarLateral({ children }) {
  // Verifico si existe el token para ver si está logueado
  const isLogged = !!window.localStorage.getItem("token");

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleClickMenu = (ruta) => {
    navigate(ruta);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={logoOficio}
            alt="Logo"
            style={{ height: 40, width: "auto", borderRadius: 8 }}
          />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              text: "Home",
              icon: <HomeIcon sx={{ color: "#FFFFFF" }} />,
              route: "/home",
            },
            {
              text: "Profesionales",
              icon: <SearchIcon sx={{ color: "#FFFFFF" }} />,
              route: "/profesionales",
            },
            {
              text: isLogged ? "Cerrar Sesión" : "Iniciar Sesión",
              icon: isLogged ? (
                <ExitToApp sx={{ color: "#FFFFFF" }} />
              ) : (
                <LoginIcon sx={{ color: "#FFFFFF" }} />
              ),
              route: "/",
              onClick: isLogged ? logout() : null,
            },
            {
              text: "Usuarios",
              icon: <UserIcon sx={{ color: "#FFFFFF" }} />,
              route: "/usuarios",
            },
            {
              text: "Oficios",
              icon: <WorkIcon sx={{ color: "#FFFFFF" }} />,
              route: "/oficios",
            },
            // Verifico si el usuario esta logueado para mostrar el menu
            isLogged && {
              text: "Mi Perfil",
              icon: <UserIcon sx={{ color: "#FFFFFF" }} />,
              route: "/perfil",
            },
          ].map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleClickMenu(item.route)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
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
        </List>
        <Divider />
        {/* Aquí puedes agregar más elementos a tu lista si es necesario */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>{children}</Typography>
      </Box>
    </Box>
  );
}
