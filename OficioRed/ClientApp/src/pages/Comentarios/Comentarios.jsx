import './comentarios.css';
import { Comentario } from '../../components/Comentarios/Comentario';
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export function Comentarios() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    return(
        <main className="mainCard">
            <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                mb={2}
              >
                <Button
                  variant="text"
                  style={{
                    color: "white",
                    marginRight: "8px",
                    fontWeight: "bold",
                    backgroundColor: "#1b325f"
                                  }}
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => handleClick()}
                >
                  Volver
                </Button>
              </Box>
            <Comentario 
                imgUser={'josuejouvin'} 
                comentario={'Lorem ipsum, dolor sit amet consectetur adipisicing elit Quaerat ad quos porro vitae id exercitationem doloribus quisquam ut optio deleniti facere, odio quasi eos iure rerum asperiores cupiditate obcaecati voluptatum.'} 
            />
            <Comentario 
                imgUser={'hola'} 
                comentario={'Lorem ipsum, dolor sit amet consectetur adipisicing elit Quaerat ad quos porro vitae id exercitationem doloribus quisquam ut optio deleniti facere, odio quasi eos iure rerum asperiores cupiditate obcaecati voluptatum.'} 
            />
            <Comentario 
                imgUser={'youTube'} 
                comentario={'Lorem ipsum, dolor sit amet consectetur adipisicing elit Quaerat ad quos porro vitae id exercitationem doloribus quisquam ut optio deleniti facere, odio quasi eos iure rerum asperiores cupiditate obcaecati voluptatum.'} 
            />
            <hr />
        </main>
    )
}