import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount(){
    if(this.props.match.params.handle){
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if(profile === null || loading){
      profileContent = <Spinner />;
    } else {

    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              Profile Content
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfileByHandle})(Profile);