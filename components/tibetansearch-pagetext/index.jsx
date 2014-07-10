/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var pagetext = React.createClass({
  shouldComponentUpdate:function(nextProps,nextState) {
  //  if (nextProps.page==this.props.page) return false;
    return true;
  },
  getInitialState: function() {
    return {bar: "world"};
  },
  help:function() {
    return <div>help</div>
  },
  render: function() {
    if (!this.props.page) {
      return this.help();
    } else 
    return (
      <div>
        <div className="pagetext" dangerouslySetInnerHTML={{__html:this.props.page.text}}></div>        
      <h5><span className="label label-success">{this.props.pagename}</span></h5>
      </div>
    );
  }
});
module.exports=pagetext;