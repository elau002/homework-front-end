import React from 'react';
import Fade from '@material-ui/core/Fade';
import GifModal from './GifModal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '20% 20% 20% 20% 20%', 
    gridTemplateRows: '25% 25% 25% 25%',
    gridAutoFlow: 'row | row dense',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '25% 25% 25% 25%',
      gridTemplateRows: '25% 25% 25% 25%',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: '25% 25% 25% 25%',
    },
    justifyItems: 'stretch',
    paddingTop: '8%'
  }
})

function GifList(props) {
  const { classes, gifList } = props;

  let listItem = gifList.map((gif, index) => (
    <Fade in={true} key={gif.id} timeout={1000}>
        <GifModal gif={gif}/> 
    </Fade>
  ))

  return ( 
    <div className={classes.grid}>
      {listItem}
    </div>
  )
}

GifList.propTypes = {
  classes: PropTypes.object.isRequired,
  gifList: PropTypes.arrayOf(PropTypes.shape({
    images: PropTypes.object.isRequired,
    rating: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired
}

export default withStyles(styles)(GifList);