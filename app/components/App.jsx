import React from 'react';
import ReactDOM from 'react-dom';
// import spinner from './spin.svg';
require('./App.css');

// Post list item image
var PostImage = React.createClass({
  getDefaultProps: function() {
  	var load = 'Loading...'
    return {
      loader: load,
      showImage: false
    };
  },

  componentDidUpdate: function(prevProps) {
    if (! this.props.showImages && prevProps.viewport) {
      this.updatePosition();
    }
  },

  updatePosition: function() {
    var el = ReactDOM.findDOMNode(this);
    this.props.updateImagePosition(el.offsetTop, el.offsetHeight);
  },

  render: function() {
    var img = (this.props.showImage) ? this.props.src : this.props.loader;
    return (
      <img src={img} alt={this.props.alt} />
    );
  }
});

// Post list item
var Post = React.createClass({
  getInitialState: function() {
    return {
      showImage: false
    };
  },

  getDefaultProps: function() {
    return {
      showImage: false
    };
  },

  componentWillMount: function() {
    // allow image display override
    if (this.props.showImage) {
      this.setShowImage(true).bind(this);
    }
  },

  updateImagePosition: function(top, height) {
    // image is already displayed, no need to check anything
    if (this.state.showImage) {
      return;
    }

    // update showImage state if component element is in the viewport
    var min = this.props.viewport.top;
    var max = this.props.viewport.top + this.props.viewport.height;

    if ((min <= (top + height) && top <= (max - 300))) {
      this.setShowImage(true);
    }
  },

  setShowImage: function(show) {
    this.setState({
      showImage: !!(show)
    });
  },

  render: function() {
    return (
        <div className="item">
          <PostImage src={this.props.image} alt={this.props.title} viewport={this.props.viewport} showImage={this.state.showImage}
            updateImagePosition={this.updateImagePosition} />
          <div className="content">
            <h2>{this.props.title}</h2>
          </div>
        </div>
    );
  }
});

// Post list
var PostList = React.createClass({
  getInitialState: function() {
    return {
      viewport: {
        top: 0,
        height: 0
      }
    };
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.updateViewport, false);
    window.addEventListener('resize', this.updateViewport, false);
    this.updateViewport();
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.updateViewport);
    window.removeEventListener('resize', this.updateViewport);
  },

  updateViewport: function() {
    // TODO: debounce this call
    this.setState({
      viewport: {
        top: window.pageYOffset,
        height: window.innerHeight
      }
    });
  },

  render: function() {
    var self = this;

    var itemViews = this.props.items.map(function(item) {
      return <Post title={item.title} image={item.image} viewport={self.state.viewport} />
    });

    return (
      <div className="wrapper">
      	<div className="masonry">
        	{itemViews}
        </div>
      </div>
    );
  }
});

export default PostList;