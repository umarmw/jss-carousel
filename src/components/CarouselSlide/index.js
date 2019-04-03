import React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import {
  CarouselItem,
  CarouselCaption
} from 'reactstrap';

const CarouselSlide = (props) => (

  <CarouselItem
          onExiting={props.onExiting}
          onExited={props.onExited}
          key={props.fields.imgSrc.value}
          className={props.in ? "active" : " " }
        >
          <img src={props.fields.imgSrc.value} alt={props.fields.label.value} />
          <CarouselCaption captionText={props.fields.caption.value} captionHeader={props.fields.label.value} />
        </CarouselItem>
);
export default withSitecoreContext()(CarouselSlide);