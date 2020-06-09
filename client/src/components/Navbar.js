import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" component={Link} to={"/"}>My App</Button>
          </Typography>
          <Button color="inherit" component={Link} to={"/login"}>Login</Button>
          <Button color="inherit" component={Link} to={"/register"}>Register</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;