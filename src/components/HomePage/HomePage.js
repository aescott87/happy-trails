import React, {Component} from 'react';
import { connect } from 'react-redux';


class HomePage extends Component {

  state = {
    trailNameQuery: ''
  }

  handleChange = (event) => {
    this.setState({
      trailNameQuery: event.target.value
    });
  }

  handleTrailSearch = (event) => {
    event.preventDefault();
    console.log('In handle search', this.state.trailNameQuery);
    this.props.dispatch({ type: 'SEARCH_TRAIL', payload: this.state.trailNameQuery})
  }

  render() {
    return (
      <div>
        <h1>Let's Start Hiking!</h1>
        <form onSubmit={(event) => this.handleTrailSearch(event)}>
          <legend>Search by Park Name:</legend>
          <input placeholder="Name" onChange={(event) => this.handleChange(event)}/>
          <button>Search</button>
        </form>
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(HomePage);
