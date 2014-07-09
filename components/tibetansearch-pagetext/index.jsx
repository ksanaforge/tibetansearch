/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var pagetext = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  render: function() {
    return (
      <div>
        page text
      </div>
    );
  }
});
module.exports=pagetext;