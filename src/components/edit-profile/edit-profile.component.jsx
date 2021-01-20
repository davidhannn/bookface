import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';

import { createStructuredSelector } from 'reselect';

import { firestore } from '../../firebase/firebase.utils'

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { editUserDetailStart } from '../../redux/user/user.actions';

import './edit-profile.styles.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
      width: "100%",
      borderStyle: 'none',
      padding: '10px 10px',
      borderRadius: '8px',
  }
}));

const EditProfile = ({ currentUser, editUserDetailStart, userId }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userDetail, setUserDetail] = useState({ bio: "", location: "", education: "" })


  useEffect(() => {
    firestore.collection('userDetails').doc(userId).onSnapshot((snapshot) => {
      if(!snapshot.exists) {
        setUserDetail({ bio: "", location: "", education: ""})
      } else {
      setUserDetail(snapshot.data())
      }
  })
  }, [])


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserDetail({ ...userDetail, [name]: value})
  }

  const handleClick = (e) => {
    e.preventDefault()
    editUserDetailStart(currentUser, userDetail)
  }

  // const { bio, location, education } = userDetail

  return (
    <div className="edit-button-container">
      <button type="edit-button" className={classes.button} onClick={handleOpen}>
        Edit Details
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Edit Details</h2>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Bio" variant="outlined" name="bio" value={userDetail.bio} onChange={handleChange} fullWidth/>
                <TextField id="outlined-basic" label="Current Location" variant="outlined"  name="location" value={userDetail.location} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Education" variant="outlined" name="education" value={userDetail.education} onChange={handleChange}/>
              </form>
              <div className="button-container">  
                  <button className="cancel-button" onClick={handleClose}>Cancel</button>
                  <button className="save-button" type="submit" onClick={handleClick}>Save</button>
              </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  editUserDetailStart: (currentUser, userDetail) => dispatch(editUserDetailStart({currentUser, userDetail}))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);