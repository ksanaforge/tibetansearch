/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var resultlist = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  gopage:function(e) {
    var pagename=e.target.innerHTML;
    var file=e.target.attributes["data-file"];
    this.props.action("gopage",pagename);
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
      return <div>
      {r.seq+1} [<a href="#" data-file={r.file} onClick={that.gopage}>{r.pagename}</a>]
      <div className="result" dangerouslySetInnerHTML={{__html:r.text}}></div>
      </div>
    });  
  },  
  showLogo:function() {
    return (
    <div className="jumbotron">
     <h1>Tibetan Search Engine</h1>
        <p>...</p>
        <p><a className="btn btn-primary btn-lg" role="button">About</a></p>
    </div>
    );
  },
  render: function() {
      if (this.props.Q) return <div className="resultlist">
        querystring:<span className="query">{this.props.Q.query}</span>
          <span className="label label-info">{this.props.Q.rawresult.length}</span>{this.warning()}
        {this.show()}
      </div>
      else return this.showLogo();
  }
});
module.exports=resultlist;