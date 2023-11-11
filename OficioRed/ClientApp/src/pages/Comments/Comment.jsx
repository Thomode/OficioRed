import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
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
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  const handleEdit = () => {
    setActiveComment({ id: comment.id, type: "editing" });
  };

  const handleReply = () => {
    setActiveComment({ id: comment.id, type: "replying" });
  };

  return (
    <Card key={comment.id} elevation={3}>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src="/user-icon.png" />
          <div style={{ marginLeft: "8px" }}>
            <Typography variant="subtitle1" component="div">
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
            submitLabel="Update"
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
        {canReply && (
          <IconButton onClick={handleReply} size="small">
            <ReplyIcon />
          </IconButton>
        )}
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
      {isReplying && (
        <CommentForm
          submitLabel="Reply"
          handleSubmit={(text) => addComment(text, replyId)}
        />
      )}
      {replies.length > 0 && (
        <div className="replies">
          {replies.map((reply) => (
            <Comment
              comment={reply}
              key={reply.id}
              setActiveComment={setActiveComment}
              activeComment={activeComment}
              updateComment={updateComment}
              deleteComment={deleteComment}
              addComment={addComment}
              parentId={comment.id}
              replies={[]}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default Comment;
