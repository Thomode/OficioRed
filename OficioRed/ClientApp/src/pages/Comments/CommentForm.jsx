import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

import "./comment.css";

const CommentForm = ({
  handleSubmit,
  submitLabel,
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
    <Paper className="escribirComment" elevation={3} style={{ padding: "16px" }}>
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
            background: "#1b325f",
            borderRadius: "8px",
            color: "white",
          }}
        >
          {submitLabel}
        </Button>
      </form>
    </Paper>
  );
};

export default CommentForm;
