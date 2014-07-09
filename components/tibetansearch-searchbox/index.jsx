/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var searchbox = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  keypress:function(e) {
    if (e.keyCode==13) this.dosearch();
  },
  dosearch:function() {
    var tofind=this.refs.tofind.getDOMNode().value;
    this.props.action("search",tofind);
  },
  insertwildcard:function() { 
    var dom=this.refs.tofind.getDOMNode();
    var tofind=dom.value;
    dom.value+="%";
    dom.focus();
  },
  render: function() {
    return (
      <div className="searchbox">
         <div className="input-group"> 
              <span className="input-group-btn">
              <button onClick={this.insertwildcard} className="btn btn-default" type="button">%</button>
              <input defaultValue="འ%ས་སོ" ref="tofind" onKeyPress={this.keypress} type="text" className="input-lg large-input"></input>
                <button onClick={this.dosearch} className="btn btn-default" type="button">Go!</button>
              </span>
          </div>
      </div>
    );
  }
});
module.exports=searchbox;