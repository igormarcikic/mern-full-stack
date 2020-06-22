import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Container,
    Typography,
    Card,
    CardHeader,
    Avatar,
    IconButton,
    CardContent,
    CardActions,
    CardMedia
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      marginTop: theme.spacing(4)
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

const SinglePost = () => {
    const { postId } = useParams();
    const { loading, error, data } = useQuery(FETCH_SINGLE_POST_QUERY, {
        variables: { postId }
    });
    const CurrentUser = useSelector(state => state.CurrentUser);
    const classes = useStyles();

    return loading ? 
        <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                Loading...
            </Typography>
        </Container> : (
        <Container>
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
                    title={ data.getPost.title }
                    subheader={moment(data.getPost.createdAt).fromNow()}
                />
                <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2020/06/06/16/40/milk-5267300_960_720.jpg"
                    title= {data.getPost.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.getPost.body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                    <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );

};

const FETCH_SINGLE_POST_QUERY = gql`
    query getPost($postId: String!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            title
            username
        }
    }
`;

export default SinglePost;