import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
require('./App.css');

var Header = React.createClass({
	render: function() {
		return (
			<h3 className="title">{this.props.siteName}</h3>
		);
	}
});

var Options = React.createClass({
	// localHandleClick: function() {
	// 	this.props.localHandleClick();
	// },
	render: function() {
		return (
			<li onClick={this.props.localHandleClick} className="load">See More</li>
		);
	}
});

var Filters = React.createClass({
	localHandleClick: function() {
		this.props.localHandleClick(this.props.filterName);
	},

	render: function() {
		return (
			<li onClick={this.localHandleClick} className={this.props.filterName}>{this.props.filterName}</li>
		);
	}
});

// Post list item image
var PostImage = React.createClass({
  getDefaultProps: function() {
    return {
      loader: 'Loading...',
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
    if(this.props.showImage) {
    	return (
	      <img src={this.props.src} alt={this.props.alt} />
	    );
    }else {
    	return (
	      <div className="loading">{this.props.loader}</div>
	    );
    }
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
					<small>{this.props.symbol}</small>
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
      nowShowing: 'all',
      posts: [],
      postsFiltered: [],
      toBeAdded: []
    };
  },

  componentDidMount: function() {
  	var self = this;
  	var postProcessed = [];
  	var url = "https://dl.dropboxusercontent.com/u/11354808/posts.json";
  	$.getJSON(url, function(result) {
  		if(!result || !result.items || !result.items.length){
  			return;
  		}
  			for(var i = 0; i < result.items.length; i++) {
  				var post = {
	  				source: "",
	  				user: "",
	  				avatar: "",
	  				text: "",
	  				image: "",
	  				time: "",
	  				symbol: ""
		  			};
	  			post.source = result.items[i].service_name.toLowerCase();
	  			post.time = self.prettyDate(result.items[i].item_published);
	  			if(post.source == "manual"){
	  				post.user = "Manual";
	  				post.avatar = "http://placehold.it/150x150";
	  				post.text = result.items[i].item_data.text;
	  				post.image = result.items[i].item_data.image_url;
	  				post.symbol = "Manual";
	  			}
	  			if(post.source == "twitter") {
	  				post.user = "@" + result.items[i].item_data.user.username;
	  				post.avatar = result.items[i].item_data.user.avatar;
	  				post.text = result.items[i].item_data.tweet;
	  				post.image = "http://placehold.it/550x200?text=no+image+:/";
	  				post.symbol = "Twitter";
	  			}
	  			if(post.source == "instagram") {
	  				post.user = "@" + result.items[i].item_data.user.username;
	  				post.avatar = result.items[i].item_data.user.avatar;
	  				post.text = result.items[i].item_data.caption;
	  				post.image = result.items[i].item_data.image.large;
	  				post.symbol = "Instagm";
	  			}
	  			postProcessed.push(post);
  			}
  		self.setState({
  			posts: postProcessed,
  			toBeAdded: postProcessed
  		});
  	});

    window.addEventListener('scroll', this.updateViewport, false);
    window.addEventListener('resize', this.updateViewport, false);
    self.updateViewport();
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.updateViewport);
    window.removeEventListener('resize', this.updateViewport);
  },

  prettyDate: function(timestamp) {

  	var current = new Date();
  	var previous = new Date(timestamp.replace(/[" "]/g, "T"));

  	var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    
    var elapsed = current - previous;
    
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }
    else if (elapsed < msPerMonth) {
         return '' + Math.round(elapsed/msPerDay) + ' days ago';   
    }
    else if (elapsed < msPerYear) {
         return '' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    else {
         return '' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
  },

  updateViewport: function() {
    this.setState({
      viewport: {
        top: window.pageYOffset,
        height: window.innerHeight
      }
    });
  },

  clickDoFilter: function(filterName){
  	var self = this;
  	var postsFiltered = [];
  	var toBeFiltered = self.state.posts;
	for(var i = 0; i < toBeFiltered.length; i++){
    	if (toBeFiltered[i].source == filterName || filterName == 'all'){
    		postsFiltered.push(toBeFiltered[i]);
    	}
    }
    self.setState({
    	postsFiltered: postsFiltered,
    	nowShowing: filterName
    })
  },

  clickAddMore: function() {
  	var self = this;
  	var totalPosts = self.state.posts.concat(self.state.toBeAdded);
  	self.state.posts = totalPosts;
  	self.clickDoFilter(this.state.nowShowing);
  },

  render: function() {
    var self = this;
    if(self.state.nowShowing == 'all'){
    	self.state.postsFiltered = self.state.posts;
    }
	var posts = self.state.postsFiltered.map(function(post) {
  		return <Post source={post.source} symbol={post.symbol} user={post.user} avatar={post.avatar} text={post.text} timestamp={post.time} image={post.image} viewport={self.state.viewport} />
	});

	if(!posts.length){
		posts = <div className='loading'>Loading...</div>;
	}

    return (
    	<div>
	    	<div className="header">
				<Header siteName={"SOCIAL • ite"} />
			</div>
	    	<div className="wrapper">
	    		<ul className="filter">
	    			<Filters localHandleClick={this.clickDoFilter} filterName={"manual"} />
	    			<Filters localHandleClick={this.clickDoFilter} filterName={"twitter"} />
	    			<Filters localHandleClick={this.clickDoFilter} filterName={"instagram"} />
	    			<Filters localHandleClick={this.clickDoFilter} filterName={"all"} />
	    		</ul>
			  	<div className="masonry">
			    	{posts}
			    </div>
			    <ul className="options">
			    	<Options localHandleClick={this.clickAddMore} />
			    </ul>
		    </div>
	    </div>
    );
  }
});

export default Posts;