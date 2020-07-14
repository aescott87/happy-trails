import React, { Component } from 'react';
import { connect } from 'react-redux';

class SavedTrails extends Component {

  state = {
    trailNotes: ''
  }

  componentDidMount() {
    this.getSavedTrails();
  }

  getSavedTrails = () => {
    this.props.dispatch({ type: 'GET_SAVED_TRAIL' });
  }

  handleAddNotes = (event) => {
    this.setState({
      trailNotes: event.target.value
    })
  }

  updateNotes = (event, id) => {
    event.preventDefault();
    console.log('in updateNotes');
    this.props.dispatch({ type: 'UPDATE_NOTES', payload: {id, notes: this.state.trailNotes} })
    this.getSavedTrails();
  }

  render() {
    return (
      <>
        <h2>Your Saved Trails</h2>
        {this.props.savedTrails ?
          <>
            {this.props.savedTrails.map((trail) => {
              return (
                <>
                  <p><b>Name:</b> {trail.name}</p>
                  <p><b>Location:</b> {trail.formatted_address}</p>
                  <p><b>Average Rating:</b> {trail.rating}</p>
                  <form onSubmit={(event) => this.updateNotes(event, trail.place_id)}>
                  <textarea 
                    rows='6' 
                    cols='40' 
                    value={trail.notes} 
                    onChange={(event) => this.handleAddNotes(event)}
                    />
                  <button type='submit'>Update Notes</button>
                  </form>
                </>
              )
            })}
          </> : null}
      </>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
  user: reduxStore.user,
  savedTrails: reduxStore.savedTrail.savedTrail
});

export default connect(mapStateToProps)(SavedTrails);
