import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";

const actions = [
    { icon: <FileCopyIcon />, name: 'Copiar' },
    { icon: <FavoriteIcon />, name: 'Favoritos' },
    { icon: <CommentIcon />, name: 'Comentarios' },
    { icon: <ArrowBackIcon />, name: 'Volver' },
];


export default function SpeedDialTooltipOpen() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const handleClickComments = (id) => {
        navigate(`/${id}/PerfilProfesional/Comentarios`);
    };

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <Backdrop open={open} style={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={() => {
                            handleClose();
                            if (action.name === 'Comentarios') {
                                handleClickComments(/* Aquí debes proporcionar el ID adecuado */);
                            } else if (action.name === 'Volver') {
                                handleClick();
                            }
                        }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
