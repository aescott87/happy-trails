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
          {this.props.searchList ?
            <>
              {this.props.searchList.map((trail) => {
                return (
                  <>
                    {/*<img src={trail.icon} alt="img" />*/}
                    <p><b>Trail Name:</b> {trail.name}</p>
                    <p><b>Location:</b> {trail.formatted_address}</p>
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
  searchList: reduxStore.searchResult.searchResult.candidates,
});

export default connect(mapStateToProps)(SearchResultsPage);
