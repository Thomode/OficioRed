import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CommentForm from "./CommentForm";

import "./comment.css";

const Comment = ({
  comment,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && !timePassed;
  const canEdit = currentUserId === comment.userId && !timePassed;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  const handleEdit = () => {
    setActiveComment({ id: comment.id, type: "editing" });
  };

  return (
    <Card key={comment.id} elevation={3} className="commentContainer">
      <CardContent className="commentContainer">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src="/user-icon.png" />
          <div style={{ marginLeft: "8px" }}>
            <Typography>
              {comment.username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {createdAt}
            </Typography>
          </div>
        </div>
        {!isEditing && (
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            {comment.body}
          </Typography>
        )}
        {isEditing && (
          <CommentForm
            submitLabel="Guardar cambios"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
      </CardContent>
      
      <CardActions>
        {canEdit && (
          <IconButton onClick={handleEdit} size="small">
            <EditIcon />
          </IconButton>
        )}
        {canDelete && (
          <IconButton onClick={() => deleteComment(comment.id)} size="small">
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Comment;
