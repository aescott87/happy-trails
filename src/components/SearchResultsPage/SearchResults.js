import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchResultsPage extends Component {

  addSavedTrail = (id) => {
    console.log('in addSavedTrail, place id is', id)
    this.props.dispatch({ type: 'ADD_SAVED_TRAIL', payload: id })
  }

  render() {
    return (
      <>
        <div>
          <h2>Search Results</h2>
          {this.props.searchList ?
            <>
              {this.props.searchList.map((trail) => {
                return (
                  <>
                    {trail.photos ?
                      <>
                        {trail.photos.map((photo) => {
                          return (
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyB08HpDq5YU_mltlcG_U3WJdUaELaLcezY`} alt="img" />
                          )
                        })}
                      </> : null
                    }
                    <p><b>Name:</b> {trail.name}</p>
                    <p><b>Location:</b> {trail.formatted_address}</p>
                    <p><b>Average Rating:</b> {trail.rating}</p>
                    <button onClick={() => this.addSavedTrail(trail.place_id)}>Add to Saved Trails</button>
                  </>
                )
              })}
            </> : null}
        </div>
      </>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
  searchList: reduxStore.searchResult.searchResult.results,
  user: reduxStore.user
});

export default connect(mapStateToProps)(SearchResultsPage);
