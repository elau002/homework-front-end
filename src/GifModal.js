import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GifContainer from './GifContainer'
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  media: {
    height: 'auto',
    margin: '0 auto',
    maxHeight: 500,
    width: '70%',
    [theme.breakpoints.up('md')]: {
      width: '75%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    }
  },
  paper: {
    display: 'flex',
    flexFlow: 'column',
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class GifModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render () {
    const { classes, gif } = this.props;
    let uploader, uploadDate;

    if (gif.user) {
      uploader = <Button href={gif.user.profile_url}>{gif.user.display_name}</Button>
    } else {
      uploader = <span>{'Anonymous'}</span>
    }
    
    uploadDate = gif.import_datetime.split(' ')[0];
    
    return (
      <div>
        <Button onClick={this.handleOpen}>
          <GifContainer gif={gif}/>
        </Button>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                component="img"
                src={gif.images.original.url}
                title={gif.title}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Title: {gif.title}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Uploader: {uploader}
                  <br/>
                  Upload Date: {uploadDate}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Rating: {gif.rating}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Modal>
      </div>
    )
  }
}

GifModal.propTypes = {
  classes: PropTypes.object.isRequired,
  gif: PropTypes.object.isRequired,
};

const GifModalWrapped = withStyles(styles)(GifModal);

export default GifModalWrapped;