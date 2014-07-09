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
  show:function() {
    var that=this;
    return this.props.Q.excerpt.map(function(r,i){ // excerpt is an array 
      return <div>
      <hr/>
      <a href="#" data-file={r.file} onClick={that.gopage}>{r.pagename}</a>
      <div className="result" dangerouslySetInnerHTML={{__html:r.text}}></div>
      </div>
    }); 
  },  
  render: function() {
      if (this.props.Q) return <div className="resultlist">
        <span className="query">{this.props.Q.query+" "+this.props.Q.rawresult.length}</span>
        {this.show()}
      </div>
      else return <div>Not Found</div>
  }
});
module.exports=resultlist;