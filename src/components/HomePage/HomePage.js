import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.css';


class HomePage extends Component {

  state = {
    trailNameQuery: 'Hiking trails in '
  }

  handleChange = (event) => {
    this.setState({
      trailNameQuery: event.target.value
    });
  }

  handleTrailSearch = (event) => {
    event.preventDefault();
    console.log('In handle search', this.state.trailNameQuery);
    this.props.dispatch({ type: 'SEARCH_TRAIL', payload: this.state.trailNameQuery })
    this.props.history.push('/searchresults');
  }

  render() {
    return (
      <>
        <section class="hero is-primary is-fullheight is-bold">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Welcome to Happy Trails</h1>
              <h2 class="subtitle">Let's Explore</h2>
            </div>
            <div class="field">
              <label class="label">I'm looking for...</label>
              <div class="control">
                <input class="input is-info" type="text" value={this.state.trailNameQuery} onChange={(event) => this.handleChange(event)} />
                <button onClick={(event) => this.handleTrailSearch(event)} class="button is-info is-inverted">Search</button>
              </div>
            </div>
          </div>
        </section>
      </>
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
