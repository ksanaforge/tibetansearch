/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var ExpandedToken=React.createClass({
  tokenclick:function(e) {
    var n=e.target;
    if (n.tagName!="A") n=n.parentElement;
    var elements=n.parentNode.getElementsByClassName("active");
    for (var i=0;i<elements.length;i++){
      elements[i].classList.remove("active");
    }
    n.classList.toggle('active');
    var ntoken=parseInt(n.attributes["data-ntoken"].value);
    var group=parseInt(n.attributes["data-group"].value);
    this.props.action("tokenclick",ntoken, group);
  },
  showtokenwithhits:function(tokenwithhits,variants) {
    if (tokenwithhits!=variants.length) {
      return <span><span className="label label-warning">{tokenwithhits}</span>/
      <span className="label label-info">{this.props.token.variants.length}</span></span>
    }else {
      return <span className="label label-info">{this.props.token.variants.length}</span>      
    }
      
  },
  
  render:function() {
    var that=this;
    var token=this.props.token;
    var tokenwithhits=0;
    this.props.token.variants.map(function(v){
      if (v[1]) tokenwithhits++
    });
    return <div className=" col-md-4">
      <span>{this.props.token.raw}</span>{this.showtokenwithhits(tokenwithhits,this.props.token.variants)}
       <ul className="expanded tokenlist list-group" style={{"height":"80%"}} >
      {token.variants.map(function(t,idx){
        if (t[1]==0) return ; // variants without hit
        var classes="list-group-item";
        if (idx==0) classes+=" active";
        return <a href="#"  data-group={that.props.group} 
            data-ntoken={idx}   title={t[1]}
            onClick={that.tokenclick}  className={classes}>{t[0]}
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
    return <span><strong>Usage:</strong>
      <br/>press enter for quick search.
      <br/>if the search phrase has only one wildcard syllable, hit [Filter] to eliminate impossible candidate.
      <br/>use space or shad to seperate multiple terms.
      <br/><strong>Wildcard Syllable:</strong>
      <br/>x% :  match syllable starts with x
      <br/>%y :  match syllable ends with y
      <br/>%x% :  match syllable containing x
      <br/>x%y :  match syllable starts with x and ends with y
      <br/>maximum 3 syllables can have wildcard.
      <br/>
      <br/><i>Special thanks to Khenpo Karma Namgyal from leksheyling</i>
    </span>
  },
  newsearchphrase:function() {
    var newq="",group=0;
    for (var i in this.props.Q.terms) {
      var T=this.props.Q.terms[i];
      if (T.variants.length) {
        var selected=this.state.selected[group]||0;
        newq+=T.variants[selected][0]+"་";
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
        res.push(<ExpandedToken action={this.action} token={T} group={i} />);
        expanded++;
        if (expanded>=3) break;
      }
    }
    return res;
  },
  render: function() {
    if (!this.props.Q || !this.props.Q.terms.length) return this.help();
    else return (
      <div className="row">
        {this.showExpandedTokens()}
      </div>
    );
  }
});
module.exports=queryinfo;