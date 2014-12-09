/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var tibetan=Require("ksana-document").languages.tibetan; 

var searchbox = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  getTofind:function() {
      var tofind=this.refs.tofind.getDOMNode().value;
      tofind=tofind.replace(/%/g,"\uffff");
      tofind=tibetan.romanize.fromWylie(tofind,null,false); 
      tofind=tofind.replace(/\uffff/g,"%");
      return tofind;
  },
  tofindchange:function() {
      var that=this;
      clearTimeout(this.timer1);
      this.timer1=setTimeout(function(){

        that.props.action("tofindchange",that.getTofind());
      },300);
  },
  keypress:function(e) {
    if (e.key=="Enter") this.dosearch();
  },
  dosearch:function() {
    this.props.action("search",this.getTofind());
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
    this.props.action("filter",this.getTofind());
  },
  showfilter:function() {
    var disabled="";
    if (this.props.wildcard!=1) disabled=" disabled";
    if (this.props.progress==1) {
      return <button onClick={this.filter} className={"btn btn-warning"+disabled} type="button">Filter</button>  
    } else {
      return <span>{Math.floor(this.props.progress*100)+"%"}</span>
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