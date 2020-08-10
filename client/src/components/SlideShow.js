import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Styling/slider.css';
class SlideShow extends Component {
  render() {
    return (
      <div className="slideShow">
          <div className="row">
              <div class="carousel-wrapper">
            <Carousel infiniteLoop useKeyboardArrows autoPlay>
                <div className="imgText">
                <div class="centered">IMAGE1</div>
                <img src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt=" "/>
                </div>
                <div className="imgText">
                <div class="centered">IMAGE2</div>
                    <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt=" "/>
                </div>
                <div className="imgText">
                <div class="centered">IMAGE3</div>
                    <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt=" "/>
                </div>
            </Carousel>
        </div>
              </div>
      </div>
    )
  }
}
export default SlideShow