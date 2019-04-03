import React from 'react';
import { withPlaceholder, withSitecoreContext} from '@sitecore-jss/sitecore-jss-react';
import {
  Carousel,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';


class CarouselContainer extends React.Component {
 constructor(props, context) {
     super(props, context);
     this.state = { activeIndex: 0 };
     this.next = this.next.bind(this);
     this.previous = this.previous.bind(this);
     this.goToIndex = this.goToIndex.bind(this);
     this.onExiting = this.onExiting.bind(this);
     this.onExited = this.onExited.bind(this);

 }

onExiting() {
  this.animating = true;
}

onExited() {
  this.animating = false;
}

next() {
  if (this.animating) return;
  const nextIndex = this.state.activeIndex === this.props.slidesPlaceholder.length - 1 ? 0 : this.state.activeIndex + 1;
  this.setState({ activeIndex: nextIndex });
}

previous() {
  if (this.animating) return;
  const nextIndex = this.state.activeIndex === 0 ? this.props.slidesPlaceholder.length - 1 : this.state.activeIndex - 1;
  this.setState({ activeIndex: nextIndex });
}

goToIndex(newIndex) {
  if (this.animating) return;
  this.setState({ activeIndex: newIndex });
}

 render() {

     const { slidesPlaceholder} = this.props;
     const { activeIndex } = this.state;

     return (

      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={slidesPlaceholder} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        
        {(slidesPlaceholder || [])
             .filter((slide) => slide.props && slide.props.fields)
             .map((slide, index) =>
             {
               return slide;
              }
             )}

        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>

     );
 }
}

const carouselComponentWithPlaceholderInjected = withPlaceholder({
 placeholder: 'jss-carousel-slide',
 prop: 'slidesPlaceholder',
})(CarouselContainer);

const carouselWithPlaceholderAndSitecoreContext = withSitecoreContext()(
 carouselComponentWithPlaceholderInjected
);
export default carouselWithPlaceholderAndSitecoreContext;