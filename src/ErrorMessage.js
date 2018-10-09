import React, {
  Component
} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

class ErrorMessage extends Component {
  componentDidMount() {
    window.setTimeout( () => this.props.hideErrorMessage(), 7000);
  }

  render () {
    const { error } = this.props;
  
    return (
      <Fade in={true} timeout={2000}>
        <AppBar position="static" color="secondary">
          <Typography variant="h5" component="h2">
            {error}
          </Typography>
        </AppBar>
      </Fade>
    )
  }
}

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  hideErrorMessage: PropTypes.func.isRequired
}

export default ErrorMessage;