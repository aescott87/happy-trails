import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchResultsPage extends Component {
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
                    <p><b>Trail Name:</b> {trail.RecAreaName}</p>
                    <p><b>About:</b> {trail.RecAreaDescription}</p>
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
