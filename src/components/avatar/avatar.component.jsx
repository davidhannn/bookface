import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    border: "5px solid white"
  },
}));

const ImageAvatar = ({ imgUrl }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="" src={imgUrl} className={classes.large}/>
    </div>
  );
}

export default ImageAvatar;