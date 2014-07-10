/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var expandedToken=React.createClass({
  tokenclick:function(e) {
    
    var elements=e.target.parentNode.getElementsByClassName("active");
    for (var i=0;i<elements.length;i++){
      elements[i].classList.remove("active");
    }
    e.target.classList.toggle('active');
    var ntoken=parseInt(e.target.attributes["data-ntoken"].value);
    var group=parseInt(e.target.attributes["data-group"].value);
    this.props.action("tokenclick",ntoken, group);
  },
  render:function() {
    var that=this;
    return <div className="expanded col-md-4">
      <span>{this.props.token.raw}</span> <span className="label label-info">{this.props.token.variants.length}</span>
       <ul className="tokenlist list-group" style={{"height":"80%"}} >
      {this.props.token.variants.map(function(t,idx){
        var classes="list-group-item";
        if (idx==0) classes+=" active";
        return <a href="#"  data-group={that.props.group} 
            data-ntoken={idx}
            onClick={that.tokenclick}  className={classes}>{t}
            </a>
      })}
    </ul></div>
  }
});


var queryinfo = React.createClass({
  getInitialState: function() {
    return {bar: "world",selected:[]};
  },
  help:function() {
    return <span>Syntax:
      <br/>x% :  tokens starts with w
      <br/>%y :  tokens ends with y
      <br/>%x% :  tokens containing with x
      <br/>x%y :  tokens starts with x and ends with y
      <br/>maximum 3 token in search phrase can have wildcard
    </span>
  },
  newsearchphrase:function() {
    var newq="",group=0;
    for (var i in this.props.Q.terms) {
      var T=this.props.Q.terms[i];
      if (T.variants.length) {
        var selected=this.state.selected[group];
        newq+=T.variants[selected]+"་";
        group++;
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
      this.state.selected[args[1]]=args[0];
      this.setState({selected:this.state.selected});
      this.props.action("search",this.newsearchphrase());
    } else this.props.action(arguments);
  },
  showExpandedTokens:function() {
    if (!this.props.Q) return;
    var res=[],expanded=0;
    for (var i in this.props.Q.terms) {
      var T=this.props.Q.terms[i];

      if (T.variants.length) {
        res.push(<expandedToken action={this.action} token={T} group={i} />);
        expanded++;
        if (expanded>=3) break;
      }
    }
    return res;
  },
  render: function() {
    if (!this.props.Q || !this.props.Q.excerpt || !this.props.Q.terms.length) return this.help();
    else return (
      <div className="row">
        {this.showExpandedTokens()}
      </div>
    );
  }
});
module.exports=queryinfo;