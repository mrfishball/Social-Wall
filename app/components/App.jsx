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

// Create post item
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
          <PostImage src={this.props.image} alt={this.props.text} viewport={this.props.viewport} showImage={this.state.showImage}
            updateImagePosition={this.updateImagePosition} />
          <div className="content">
            <p>{this.props.text}</p>
            <div className="post-footer">
            	<a className="avatar" href="" />
            	<div className="post-info">
            		<a className="username" href="">{this.props.user}</a>
            		<p className="timestamp">{this.props.timestamp}</p>
            	</div>
            </div>
          </div>
        </div>
    );
  }
});

// Renders all the posts
var Posts = React.createClass({
  getInitialState: function() {
    return {
      viewport: {
        top: 0,
        height: 0
      },
      posts: [
      	{
	      	user: "SamanthaFaiers",
	      	text: "RT @Bullring: Exciting news, @SamanthaFaiers &amp; @BillieFaiers will be hosting Autumn Fashion Fix on 27 Sept &gt;  http:\/\/t.co\/tIaOjp0LpL #aff",
	      	avatar: "http://placehold.it/150x150",
	      	image: "http://placehold.it/600x350",
	      	time: "3 hours ago"
	    },
	    {
	      	user: "SamanthaFaiers",
	      	text: "RT @Bullring: Exciting news, @SamanthaFaiers &amp; @BillieFaiers will be hosting Autumn Fashion Fix on 27 Sept &gt;  http:\/\/t.co\/tIaOjp0LpL #aff",
	      	avatar: "http://placehold.it/150x150",
	      	image: "http://placehold.it/600x350",
	      	time: "7 minutes ago"
	    },
	    {
	      	user: "SamanthaFaiers",
	      	text: "RT @Bullring: Exciting news, @SamanthaFaiers &amp; @BillieFaiers will be hosting Autumn Fashion Fix on 27 Sept &gt;  http:\/\/t.co\/tIaOjp0LpL #aff",
	      	avatar: "http://placehold.it/150x150",
	      	image: "http://placehold.it/600x350",
	      	time: "1 hours ago"
	    },
	    {
	      	user: "SamanthaFaiers",
	      	text: "RT @Bullring: Exciting news, @SamanthaFaiers &amp; @BillieFaiers will be hosting Autumn Fashion Fix on 27 Sept &gt;  http:\/\/t.co\/tIaOjp0LpL #aff",
	      	avatar: "http://placehold.it/150x150",
	      	image: "http://placehold.it/600x350",
	      	time: "5 hours ago"
	    },
	    {
	      	user: "SamanthaFaiers",
	      	text: "RT @Bullring: Exciting news, @SamanthaFaiers &amp; @BillieFaiers will be hosting Autumn Fashion Fix on 27 Sept &gt;  http:\/\/t.co\/tIaOjp0LpL #aff",
	      	avatar: "http://placehold.it/150x150",
	      	image: "http://placehold.it/600x350",
	      	time: "3 days ago"
	    },
	    {
	      	user: "SamanthaFaiers",
	      	text: "RT @Bullring: Exciting news, @SamanthaFaiers &amp; @BillieFaiers will be hosting Autumn Fashion Fix on 27 Sept &gt;  http:\/\/t.co\/tIaOjp0LpL #aff",
	      	avatar: "http://placehold.it/150x150",
	      	image: "http://placehold.it/600x350",
	      	time: "3 days ago"
	    },
	    {
	      	user: "SamanthaFaiers",
	      	text: "RT @Bullring: Exciting news, @SamanthaFaiers &amp; @BillieFaiers will be hosting Autumn Fashion Fix on 27 Sept &gt;  http:\/\/t.co\/tIaOjp0LpL #aff",
	      	avatar: "http://placehold.it/150x150",
	      	image: "http://placehold.it/600x350",
	      	time: "3 days ago"
	    },
	    {
	      	user: "SamanthaFaiers",
	      	text: "RT @Bullring: Exciting news, @SamanthaFaiers &amp; @BillieFaiers will be hosting Autumn Fashion Fix on 27 Sept &gt;  http:\/\/t.co\/tIaOjp0LpL #aff",
	      	avatar: "http://placehold.it/150x150",
	      	image: "http://placehold.it/600x350",
	      	time: "3 days ago"
	    },
	    {
	      	user: "SamanthaFaiers",
	      	text: "RT @Bullring: Exciting news, @SamanthaFaiers &amp; @BillieFaiers will be hosting Autumn Fashion Fix on 27 Sept &gt;  http:\/\/t.co\/tIaOjp0LpL #aff",
	      	avatar: "http://placehold.it/150x150",
	      	image: "http://placehold.it/600x350",
	      	time: "3 days ago"
	    },
	    {
	      	user: "SamanthaFaiers",
	      	text: "RT @Bullring: Exciting news, @SamanthaFaiers &amp; @BillieFaiers will be hosting Autumn Fashion Fix on 27 Sept &gt;  http:\/\/t.co\/tIaOjp0LpL #aff",
	      	avatar: "http://placehold.it/150x150",
	      	image: "http://placehold.it/600x350",
	      	time: "3 days ago"
	    },
	    {
	      	user: "SamanthaFaiers",
	      	text: "RT @Bullring: Exciting news, @SamanthaFaiers &amp; @BillieFaiers will be hosting Autumn Fashion Fix on 27 Sept &gt;  http:\/\/t.co\/tIaOjp0LpL #aff",
	      	avatar: "http://placehold.it/150x150",
	      	image: "http://placehold.it/600x350",
	      	time: "3 days ago"
	    }
      ]
    };
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.updateViewport, false);
    window.addEventListener('resize', this.updateViewport, false);
    self.updateViewport();
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

    var posts = this.state.posts.map(function(post) {
      return <Post user={post.user} avatar={post.avatar} text={post.text} timestamp={post.time} image={post.image} viewport={self.state.viewport} />
    });

    if(!posts.length){
    	posts = <p className='loading'>Loading...</p>;
    }

    return (
    	<div className="wrapper">
		  	<div className="masonry">
		    	{posts}
		    </div>
	    </div>
    );
  }
});

export default Posts;