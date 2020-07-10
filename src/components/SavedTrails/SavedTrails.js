import React, {Component} from 'react';
import { connect } from 'react-redux';

class SavedTrails extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'GET_SAVED_TRAIL' });
  }

  render() {
    return(
      <h2>Your Saved Trails</h2>

    )
  }
}

const mapStateToProps = (reduxStore) => ({
  user: reduxStore.user,
});

export default connect(mapStateToProps)(SavedTrails);
