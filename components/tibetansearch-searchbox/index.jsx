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
  componentDidUpdate:function() {
    var that=this;
    setTimeout(function(){
      that.refs.tofind.getDOMNode().focus();
    },300);
  },
  render: function() {
    return (
      <div className="searchbox">
         <div className="row"> 
              <div className="col-md-2">
              <button onClick={this.insertwildcard} className="btn btn-default" type="button">%</button>
              </div>
              <div className="col-md-8">
              <input defaultValue="འ%ས་%སོ" ref="tofind" onKeyPress={this.keypress} type="text" className="form-control input-lg large-input"></input>
              </div>
          </div>
      </div>
    );
  }
});
module.exports=searchbox;
/*
              <div className="col-md-2">
                <button onClick={this.dosearch} className="btn btn-large btn-success" type="button">Go!</button>
              </div>
*/