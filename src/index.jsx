// Post item image
var PostImage = React.createClass({
	getDefaultProps: function(){
		return {
			loader: '../img/loader.gif',
			showImage: false
		};
	},

	componentDidUpdate: function(prevProps) {
		if(! this.props.showImages && prevProps.viewport) {
			this.updatePosition();
		}
	},

	updatePosition: function() {
		val el = this.getDOMNode();
		this.props.updateImagePosition(el.offsetTop, el.offsetHeight);
	},

	render: function() {
		var img = (this.props.showImage) ? this.props.src : this.props.loader;
		return (
			<img src={img} alt={this.props.alt} />
		);
	}
});

var el = document.querySelector('#app');
React.renderComponent(Wall({items:items}), el)