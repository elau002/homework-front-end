import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    backgroundColor: '#B5B5B5',
    height: 240,
    objectFit: 'contain'
  },
})

function GifContainer(props) {
  const { classes, gif } = props;
  
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        component="img"
        src={gif.images.original.url}
        title={gif.title}
      />
    </Card>
  )
}

GifContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  gif: PropTypes.object.isRequired
}

export default withStyles(styles)(GifContainer);