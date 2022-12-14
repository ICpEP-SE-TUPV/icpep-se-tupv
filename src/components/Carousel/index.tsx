
import React from 'react';

import { ReactComponent as LeftIcon } from '../../assets/left.svg';
import { ReactComponent as RightIcon } from '../../assets/right.svg';
import './style.scss';

interface CarouselProps {
  images: string[];
}

interface CarouselState {
  current: number;
  start: number | null;
  end: number | null;
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
  constructor (props: CarouselProps) {
    super(props);

    this.state = {
      current: 0,
      start: null,
      end: null
    };

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
  }

  prev () {
    const current = this.state.current;
    if (current > 0) this.setState({ current: current - 1 });
  }

  next () {
    const current = this.state.current;
    const max = this.props.images.length;
    if (current < max - 1) this.setState({ current: current + 1 });
  }

  touchStart (event: React.TouchEvent) {
    console.log(event);
    this.setState({
      start: event.targetTouches[0].clientX,
      end: null
    });
  }

  touchMove (event: React.TouchEvent) {
    console.log(event);
    this.setState({
      end: event.targetTouches[0].clientX
    });
  }

  touchEnd (event: React.TouchEvent) {
    console.log(event);
    const state = this.state;
    if (!state.start || !state.end) return;

    const distance = state.start - state.end;
    if (distance > 50) this.next();
    if (distance < -50) this.prev();
  }

  render () {
    const images = this.props.images;
    const current = this.state.current;
    const items: React.ReactNode[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      items.push(
        <div className={`carousel-item ${current === i ? 'active' : ''}`} key={i}>
          <img src={image} alt={`Carousel Item #${i + 1}`} />
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="carousel-bg" style={{ backgroundImage: `url("${images[current]}")` }}></div>
        <div className="carousel">
          <div className="carousel-prev" onClick={this.prev}>
            <LeftIcon width={24} fill="currentColor" />
          </div>

          <div className="carousel-items" onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
            { items }
          </div>

          <div className="carousel-next" onClick={this.next}>
            <RightIcon width={24} fill="currentColor" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Carousel;
