import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography
} from '@material-ui/core/';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    justifyContent: 'center'
  }
}));

const PostCard = ({ post: { id, title, body, createdAt, username, comments } }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={ title }
        subheader={moment(createdAt).fromNow()}
      />
      <CardMedia
        className={classes.media}
        image="https://cdn.pixabay.com/photo/2020/06/06/16/40/milk-5267300_960_720.jpg"
        title= {title}
        component= {Link}
        to= {`/post/${id}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        <IconButton aria-label="delete">
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton aria-label="edit">
          <EditIcon color="primary" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PostCard;