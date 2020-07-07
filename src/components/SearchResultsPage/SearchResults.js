import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchResultsPage extends Component {

  state = {
    savedTrail: false
  }

  render() {
    return (
      <>
        <div>
          <h2>Search Results</h2>
          {this.props.trailList ?
            <>
              {this.props.trailList.map((trail) => {
                return (
                  <>
                    <p><b>Trail Name:</b> {trail.FacilityName}</p>
                    <p><b>About:</b> {trail.FacilityDescription}</p>
                    <p><b>How to Get There:</b> {trail.FacilityDirections}</p>
                    <p>Add to Saved Trails:</p><input type="checkbox"></input>
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
  trailList: reduxStore.searchResult.searchResult.RECDATA,
});

export default connect(mapStateToProps)(SearchResultsPage);
