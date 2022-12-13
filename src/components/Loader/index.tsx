
import React from 'react';

import loading from '../../assets/loading.gif';
import './style.scss';

class Loader extends React.Component {
  render () {
    return (
      <div className="loader">
        <img src={loading} alt="Loading GIF" />
      </div>
    );
  }
}

export default Loader;
