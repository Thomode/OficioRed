import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";
import {
    Typography,
    Grid,
    Button,

} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const titleStyle2 = {
    fontSize: '70px',
    fontWeight: 'bold',
    color: '#1b325f',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    WebkitTextStroke: '2px white',
    MozTextStroke: '2px white',
    marginBottom: '0px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: '10px',
    borderRadius: '10px',
    margin: '5px'
};

const Comments = ({ commentsUrl, currentUserId }) => {
  const navigate = useNavigate();
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Eliminar el comentario?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);
    const handleClick = () => {
        navigate(-1);
    };

  return (
    <div className="comments">
          <Grid xs={12}>
              <Button
                  variant="text"
                  style={{
                      color: "white",
                      margin: "10px",
                      fontWeight: "bold",
                      backgroundColor: "#1b325f"
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
          </Grid>
      <CommentForm submitLabel="Guardar" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
