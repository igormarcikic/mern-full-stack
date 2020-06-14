import React from 'react';
import PostCard from '../components/PostCard';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Grid,
    Paper
} from '@material-ui/core';
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
	const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
	
	if(data) {
		console.log(data)
	}

    return (
        <Container className={classes.root}>
            <Grid container spacing={3} className={classes.gridContainer}>
            { loading ? (
            		<h1>Loading...</h1>
            	) : (
            		data.getPosts && data.getPosts.map( post => (
            			<Grid item xs={4} key={post.id}>
				        	<PostCard post={post} />
			        	</Grid>
        			))
            	)}
		        
	     	</Grid>
        </Container>
    )
};

const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
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