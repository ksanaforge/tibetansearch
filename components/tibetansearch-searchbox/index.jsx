/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var searchbox = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  tofindchange:function() {
      var that=this;
      clearTimeout(this.timer1);
      this.timer1=setTimeout(function(){
        var tofind=that.refs.tofind.getDOMNode().value;
        that.props.action("tofindchange",tofind);
      },300);
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
  componentDidMount:function() {
    this.tofindchange();
  },
  componentDidUpdate:function() {
    var that=this;
    setTimeout(function(){
      that.refs.tofind.getDOMNode().focus();
    },300);
  },
  filter:function() {
    var tofind=this.refs.tofind.getDOMNode().value;
    this.props.action("filter",tofind);
  },
  showfilter:function() {
    var disabled="";
    if (this.props.wildcard!=1) disabled=" disabled";
    if (this.props.progress==1) {
      return <button onClick={this.filter} className={"btn btn-warning"+disabled} type="button">Filter</button>  
    } else {
      return <span>{(this.props.progress*100).toFixed(2)+"%"}</span>
    }
  },
  render: function() {
    return (
      <div className="searchbox">
         <div className="row"> 
              <div className="col-md-2">
                <button onClick={this.insertwildcard} className="btn btn-default" type="button">%</button>
              </div>
              <div className="col-md-8">
                <input defaultValue="འ%ས་སོ" ref="tofind" onChange={this.tofindchange} onKeyPress={this.keypress} type="text" className="form-control input-lg large-input"></input>
              </div>
              <div className="col-md-2">
                {this.showfilter()}
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