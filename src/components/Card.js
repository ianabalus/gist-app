import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  const { avatar_url, name, login, company, email, location, html_url } = props.detail;

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={avatar_url} alt="" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          {/* <div className="media-left">
            <figure className="image is-48x48">
              <img src={avatar_url} alt="" />
            </figure>
          </div> */}
          <div className="media-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-6">{`@${login}`}</p>
          </div>
        </div>

        <div className="content">
          <div className="has-icons-left">
            <span className="icon is-medium is-left">
              <i className="fa fa-building"></i>
            </span>
            <span>{company}</span>
          </div>
          <div className="has-icons-left">
            <span className="icon is-medium is-left">
              <i className="fa fa-map-marker"></i>
            </span>
            <span>{location}</span>
          </div>
          <div className="has-icons-left">
            <span className="icon is-medium is-left">
              <i className="fa fa-envelope"></i>
            </span>
            <span>{email}</span>
          </div>
          <div className="has-icons-left">
            <span className="icon is-medium is-left">
              <i className="fa fa-link"></i>
            </span>
            <a href={html_url} title={name} target="_blank">{html_url}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  avatar_url: PropTypes.string,
  name: PropTypes.string,
  login: PropTypes.string,
  company: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  html_url: PropTypes.string
}

export default Card;
