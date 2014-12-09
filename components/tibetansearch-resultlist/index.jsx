/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var resultlist = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  gopage:function(e) {
    var pageid=parseInt(e.target.attributes["data-page"].value);
    var fileid=parseInt(e.target.attributes["data-file"].value);
    var pagename=e.target.innerHTML;
    this.props.action("gopage",pageid,fileid,pagename);
  }, 
  warning:function() {
    if (this.props.Q.rawresult.length>1000) {
      return ",only first 1000 hits are shown";
    } else return "";
  },
  show:function() {
    var that=this;
    if (!this.props.Q || !this.props.Q.excerpt) {
      return <div></div>
    }
    return this.props.Q.excerpt.map(function(r,i){ // excerpt is an array 
      if (!r) return null;
      return <div>
      {r.seq+1} [<a href="#" data-file={r.file} data-page={r.page}  onClick={that.gopage}>{r.pagename}</a>]
      <div className="result" dangerouslySetInnerHTML={{__html:r.text}}></div>
      </div>
    });  
  },   
  showLogo:function() {
    return (
    <div className="jumbotron span12 pagination-centered">
     <h1>Tibetan Search Engine</h1>
        <p>version: 2014/12/9 build 3</p>
        <img align="center" src="treasure.png"></img>
    </div>
    );
  },
  showhit:function() {
    if (!this.props.Q.rawresult|| !this.props.Q.rawresult.length) return "0";
    else return this.props.Q.rawresult.length;
  },
  render: function() {
      if (this.props.Q) return <div className="resultlist">
        querystring:<span className="query">{this.props.Q.query}</span>
          <span className="label label-info">{this.showhit()}</span>{this.warning()}
        {this.show()}
      </div>
      else return this.showLogo();
  }
});
module.exports=resultlist;