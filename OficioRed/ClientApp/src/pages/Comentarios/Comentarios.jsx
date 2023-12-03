import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import './comentarios.css';
import { Comentario } from '../../components/Comentarios/Comentario';
import CommentForm from '../Comments/CommentForm';

const titleStyle2 = {
  fontSize: "60px",
  fontWeight: "bold",
  color: "#1b325f",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  WebkitTextStroke: "2px white",
  MozTextStroke: "2px white",
  marginBottom: "0px",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  padding: "10px",
  borderRadius: "10px",
  margin: "5px",
};

export function Comentarios() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
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
            backgroundColor: "#1b325f",
          }}
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={() => handleClick()}
        >
          Volver
        </Button>
        <Typography variant="h2" sx={titleStyle2}>
          Comentarios
        </Typography>
      </Box>

      <div className="commentContainer">
        <CommentForm
          submitLabel="Comentar"
        />
        <br />
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
      </div>
    </main>
  )
}