/** @jsx React.DOM */

var searchbox=Require("searchbox"); 
var queryinfo=Require("queryinfo"); 
var resultlist=Require("resultlist");  
var pagetext=Require("pagetext"); 

var Kde=Require("ksana-document").kde;
var Kse=Require("ksana-document").kse;
var main = React.createClass({ 
  getInitialState: function() {
    return {engine:null,Q:null,Q2:null}; 
  },  
  componentWillMount:function() {
    var that=this;
    Kde.open("jiangkangyur",function(e){
      that.setState({engine:e});
    })
  },
  hasWildcard:function(Q) {
    if (!Q) return false;
    for (var i in Q.terms) {
      if (Q.terms[i].variants && Q.terms[i].variants.length) return true;
    }
    return false;
  },
  action:function() {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();
    var res=null, that=this;
    if (type==="search") { 
       var q=args[0];
       var opts={range:{filestart:0,maxfile:100,maxhit:1000}};
       Kse.search(this.state.engine,q,opts,function(Q){
          if (that.hasWildcard(Q))  that.setState({Q:Q});
          else  that.setState({Q2:Q});
       });
    }
    return res;
  },
  render: function() { 
    return ( 
      <div>
        <div className="row searcharea">
          <div className="col-md-4">
            <searchbox action={this.action} />
            <queryinfo action={this.action} Q={this.state.Q} />
          </div>
          <div className="col-md-8">
            <resultlist action={this.action} Q={this.state.Q2}  />
          </div>
        </div>  
        <pagetext  action={this.action}  Q={this.state.Q2} className="pagetextarea" />
      </div>
    );
  }
});
module.exports=main;