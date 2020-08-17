import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchResults.css';

class SearchResultsPage extends Component {

  addSavedTrail = (id) => {
    console.log('in addSavedTrail, place id is', id)
    this.props.dispatch({ type: 'ADD_SAVED_TRAIL', payload: id })
  }

  render() {
    return (
      <>
        <div>
          {this.props.searchList ?
            <>
              <h2>Search Results</h2>
              <div className="grid-container">
                {this.props.searchList.map((trail) => {
                  return (
                    <>
                      <div class="card">
                        {trail.photos ?
                          <>
                            {trail.photos.map((photo) => {
                              return (
                                <div class="card-image">
                                  <figure class="image is-4by3">
                                    <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyB08HpDq5YU_mltlcG_U3WJdUaELaLcezY`} alt="img" />
                                  </figure>
                                </div>
                              )
                            })}
                          </> : null
                        }
                        <div class="card-content">
                          <div class="media">
                            <div class="media-content">
                              <p class="title is-4">{trail.name}</p>
                            </div>
                          </div>
                          <div class="content">
                            <p><b>Location:</b> {trail.formatted_address}</p>
                            <p><b>Average Rating:</b> {trail.rating}</p>
                          </div>
                        </div>
                        <footer class="card-footer">
                          <a onClick={() => this.addSavedTrail(trail.place_id)} class="card-footer-item">Save</a>
                        </footer>
                      </div>
                    </>
                  )
                })}
              </div>
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
