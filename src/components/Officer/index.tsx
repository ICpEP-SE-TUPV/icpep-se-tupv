
import React from 'react';

import { IOfficer } from '../../types';
import './style.scss';

interface OfficerProps {
  officer: IOfficer;
}

class Officer extends React.Component<OfficerProps> {
  render () {
    const officer = this.props.officer;
    return (
      <div className="officer">
        <img src={officer.image} alt={officer.name} width={120} className="mr-2" />
        <div className="officer-details py-2 px-1">
          <h6>{ officer.name }</h6>
          <span>{ officer.position }</span>
        </div>
      </div>
    );
  }
}

export default Officer;
