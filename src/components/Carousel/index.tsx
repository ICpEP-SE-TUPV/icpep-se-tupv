
import React from 'react';

import { ReactComponent as LeftIcon } from '../../assets/left.svg';
import { ReactComponent as RightIcon } from '../../assets/right.svg';
import './style.scss';

interface CarouselProps {
  images: string[];
}

interface CarouselState {
  current: number;
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
  constructor (props: CarouselProps) {
    super(props);

    this.state = {
      current: 0
    };

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  prev (event: React.MouseEvent) {
    const current = this.state.current;
    if (current > 0) this.setState({ current: current - 1 });
  }

  next (event: React.MouseEvent) {
    const current = this.state.current;
    const max = this.props.images.length;
    if (current < max - 1) this.setState({ current: current + 1 });
  }

  render () {
    const images = this.props.images;
    const current = this.state.current;
    const items: React.ReactNode[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      items.push(
        <div className={`carousel-item ${current === i ? 'active' : ''}`} key={i}>
          <img src={image} alt={`Carousel Item #${i + 1}`} height={600} />
        </div>
      );
    }

    return (
      <div className="carousel">
        <div className="carousel-prev" onClick={this.prev}>
          <LeftIcon width={24} fill="currentColor" />
        </div>

        <div className="carousel-bg" style={{ backgroundImage: `url("${images[current]}")` }}></div>
        <div className="carousel-items">
          { items }
        </div>

        <div className="carousel-next" onClick={this.next}>
          <RightIcon width={24} fill="currentColor" />
        </div>
      </div>
    );
  }
}

export default Carousel;
