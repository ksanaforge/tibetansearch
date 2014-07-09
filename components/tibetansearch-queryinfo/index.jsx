/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var expandedToken=React.createClass({
  tokenclick:function(e) {
    var token=e.target.innerHTML;
    this.props.action("tokenclick",token);
  },
  render:function() {
    return <ul onClick={this.tokenclick} className="tokenlist list-group" style={{"font-size":"200%","height":"80%"}} >
      {this.props.tokens.map(function(t){
        return <a href="#"  className="list-group-item">{t}</a>
      })}
    </ul>  
  }
});
var queryinfo = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  help:function() {
    return <span>Syntax:
      <br/>x% :  tokens starts with w
      <br/>%y :  tokens ends with y
      <br/>%x% :  tokens containing with x
      <br/>x%y :  tokens starts with x and ends with y
      <br/>only one token in search phrase can have wildcard
    </span>
  },
  newsearchphrase:function(wildcardtoken) {
    var newq="";
    for (var i in this.props.Q.terms) {
      var T=this.props.Q.terms[i];
      if (T.variants && T.variants.length) {
        newq+=wildcardtoken+"་";
      } else {
        newq+=T.raw+"་";
      }
    }
    return newq;
  },
  action:function() {
   var args = Array.prototype.slice.call(arguments);
    var type=args.shift();
    var res=null, that=this;
    if (type==="tokenclick") { 
      this.props.action("search",this.newsearchphrase(args[0]));

    } else this.props.action(arguments);
  },
  showExpandedTokens:function() {
    if (!this.props.Q) return;
    var res=[];
    for (var i in this.props.Q.terms) {
      var T=this.props.Q.terms[i];
      if (T.variants && T.variants.length) {
        res.push(<span>{T.raw +" "+T.variants.length}</span>);
        res.push(<expandedToken action={this.action} tokens={T.variants} />);
        break;
      }
    }
    return res;
  },
  render: function() {
    if (!this.props.Q) return this.help();
    else return (
      <div>
        {this.showExpandedTokens()}
      </div>
    );
  }
});
module.exports=queryinfo;