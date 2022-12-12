
import React from 'react';

import { IOfficer } from '../../types';
import './style.scss';

interface OfficerProps {
  officer: IOfficer;
  label?: string;
}

class Officer extends React.Component<OfficerProps> {
  render () {
    const officer = this.props.officer;
    const label = this.props.label;

    return (
      <div className="officer">
        <img src={officer.image} alt={officer.name} width={120} className="mr-2" />
        <div className="py-2 px-1">
          <h6>{ officer.name }</h6>
          <span>{ label || 'Position' }: { officer.position }</span>
        </div>
      </div>
    );
  }
}

export default Officer;
