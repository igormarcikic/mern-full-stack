import React from 'react';
import PostCard from '../components/PostCard';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
	Grid,
	Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4)
  },
  gridContainer: {
  	justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
	const classes = useStyles();
  	const CurrentUser = useSelector(state=>state.CurrentUser);
	const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
console.log(error, data)
    return (
        <Container className={classes.root}>
            <Grid container spacing={3} className={classes.gridContainer}>
            { loading ? (
            		<Typography variant="h3" component="h1" gutterBottom>
						Loading...
                	</Typography>
            	) : (
            		data.getUserPosts && data.getUserPosts.map( post => 
            			<Grid item xs={4} key={post.id}>
				        	 <PostCard post={post} />
			        	  </Grid>
        			 )
            	)}
		        
	     	</Grid>
        </Container>
    )
};

const FETCH_POSTS_QUERY = gql`
	{
		getUserPosts {
			id 
			title
			body 
			createdAt 
			username 
			comments {
				id 
				username 
				createdAt 
				body
			}
		}	
	}
`;

export default Home;