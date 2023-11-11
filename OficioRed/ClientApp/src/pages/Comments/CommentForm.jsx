import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Escribir comentario
      </Typography>
      <form onSubmit={onSubmit}>
        <TextareaAutosize
          value={text}
          onChange={(e) => setText(e.target.value)}
          rowsMin={3}
          placeholder="Escribir un comentario..."
          style={{
            width: "100%",
            height: "80px",
            marginBottom: "8px",
            marginTop: "8px",
            border: "1px solid rgb(107, 114, 12)",
            padding: "8px",
            resize: "none",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isTextareaDisabled}
          type="submit"
          style={{
            fontSize: "16px",
            padding: "8px 16px",
            background: "rgb(59, 130, 246)",
            borderRadius: "8px",
            color: "white",
          }}
        >
          {submitLabel}
        </Button>
        {hasCancelButton && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            style={{
              fontSize: "16px",
              padding: "8px 16px",
              background: "rgb(59, 130, 246)",
              borderRadius: "8px",
              color: "white",
              marginLeft: "10px",
            }}
          >
            Cancelar
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default CommentForm;
