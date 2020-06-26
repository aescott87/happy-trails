import React, {Component} from 'react';
import { connect } from 'react-redux';


class HomePage extends Component {



  render() {
    return (
      <div>
        <h1>Let's Start Hiking!</h1>
        <form>
          <legend>Search by Park Name:</legend>
          <input placeholder="Name"/>
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
