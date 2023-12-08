import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  TextareaAutosize,
  Rating,
  Box,
  Button,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { comentarioService } from "../../services/comentario.service";
import "./comentarios.css";
import { Comentario } from "../../components/Comentarios/Comentario";

const styles = {
  container: {
    padding: "16px",
    marginBottom: "16px",
  },
  stars: {
    marginBottom: "16px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    marginBottom: "8px",
    marginTop: "8px",
    border: "1px solid rgb(107, 114, 12)",
    padding: "8px",
    resize: "none",
  },
};

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
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const commentTextareaRef = useRef();

  const handleVolver = async () => {
    navigate(-1);
  };
  const handleClick = async () => {
    try {
      const commentText = commentTextareaRef.current.value;

      await comentarioService.create(commentText, id);
      //await comentarioService.createRating(id, value);
    } catch (error) {
      console.error("Error en handleClick:", error);
    }
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
          onClick={() => handleVolver()}
        >
          Volver
        </Button>
        <Typography variant="h2" sx={titleStyle2}>
          Comentarios
        </Typography>
      </Box>

      <div className="commentContainer">
        <Grid>
          <Paper
            className="escribirComment"
            elevation={3}
            style={styles.container}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Rating
                size="large"
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                icon={<StarIcon fontSize="large" />}
              />
            </Box>
            <TextareaAutosize
              ref={commentTextareaRef}
              placeholder="Cuentanos tu experiencia..."
              style={styles.textarea}
            />
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row-reverse",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  fontSize: "16px",
                  padding: "8px 16px",
                  background: "#1b325f",
                  borderRadius: "8px",
                  color: "white",
                  marginTop: "8px",
                }}
                onClick={() => handleClick()}
              >
                Comentar
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Comentario
          imgUser={"josuejouvin"}
          comentario={
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit Quaerat ad quos porro vitae id exercitationem doloribus quisquam ut optio deleniti facere, odio quasi eos iure rerum asperiores cupiditate obcaecati voluptatum."
          }
        />
        <Comentario
          imgUser={"hola"}
          comentario={
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit Quaerat ad quos porro vitae id exercitationem doloribus quisquam ut optio deleniti facere, odio quasi eos iure rerum asperiores cupiditate obcaecati voluptatum."
          }
        />
        <Comentario
          imgUser={"youTube"}
          comentario={
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit Quaerat ad quos porro vitae id exercitationem doloribus quisquam ut optio deleniti facere, odio quasi eos iure rerum asperiores cupiditate obcaecati voluptatum."
          }
        />
      </div>
    </main>
  );
}
