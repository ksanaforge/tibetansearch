/** @jsx React.DOM */
var searchbox=Require("searchbox"); 
var queryinfo=Require("queryinfo"); 
var resultlist=Require("resultlist");  
var pagetext=Require("pagetext"); 
var bootstrap=Require("bootstrap");
var Kde=Require("ksana-document").kde;
var Kse=Require("ksana-document").kse;

var fileinstaller=Require("fileinstaller");  // install files to browser sandboxed file system
 var require_kdb=[{  //list of ydb for running this application
  filename:"jiangkangyur.kdb"  , url:"http://ya.ksana.tw/kdb/jiangkangyur.kdb" , desc:"Jiang Kangyur (v1~v40)"
}];    
 
var main = React.createClass({ 
  getInitialState: function() {
    return {engine:null,Q:null,Q2:null,page:null,progress:1,wildcard:0,quota:0}; 
  },  
  componentWillMount:function() {
  },
  wildcardCount:function(Q) {
    var wildcard=0;
    if (!Q) return wildcard;
    for (var i=0;i<Q.terms.length;i++) {
      if (Q.terms[i].variants.length) {
        wildcard++;
        Q.wildcardterm=i;
      }
    }
    return wildcard;
  },
  nextsearchphrase:function(Q) {
    var newq="";
    Q.vidx=Q.vidx||0; 
    for (var i in Q.terms) {
      var T=Q.terms[i];
      if (T.variants.length) {
        newq+=T.variants[Q.vidx][0]+"་";
      } else {
        newq+=T.raw+"་";
      } 
    } 
    Q.vidx++;
    return newq;
  },  
  updateProgress:function(that) {
    var vidx=that.state.Q.vidx;
    var wt=that.state.Q.terms[that.state.Q.wildcardterm];
    var progress=vidx/wt.variants.length;
    //sort again
    that.setState({progress:progress});
  },
  findone:function(Q) {
    var that=this;
    var q=this.nextsearchphrase(Q);
    Kse.search(this.state.engine,q,{nogroup:true},function(QQ){
      var w=Q.wildcardterm;
      var wt=Q.terms[w];
      var vidx=Q.vidx;
      wt.variants[vidx-1][1]=QQ.rawresult.length; // update the variants hit
      if (vidx>=wt.variants.length) { //no more to do
        that.stopFiltering();
        wt.variants.sort(function(a,b){
          return b[1]-a[1];
        });        
        that.setState({progress:1});
      } else {
        if (!that.stop) setTimeout( that.findone.bind(that,Q),0);    
      }
    })
  },
  filter:function(q) {
     var opts={}; //raw search
     var that=this;
     this.stop=false;
     Kse.search(this.state.engine,q,opts,function(Q){
        Q.vidx=0;
        that.setState({Q:Q});
        that.findone(Q);
        that.timer1=setInterval( function(){
          that.updateProgress(that);
        }, 200);
     });
  },
  stopFiltering:function(){
    clearInterval(this.timer1);
    this.stop=true;
  },
  action:function() {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();
    var res=null, that=this;
    if (type==="search") { 
       var q=args[0];
       var opts={range:{filestart:0,maxfile:100,maxhit:1000}};
       this.stopFiltering();
       Kse.search(this.state.engine,q,opts,function(Q){
          var wc=that.wildcardCount(Q);
          if (wc==1)  that.setState({Q:Q, wildcard:wc});
          else  that.setState({Q2:Q});
       });
    } else if (type=="tofindchange") {
      this.stopFiltering();
      Kse.search(this.state.engine,args[0],{},function(Q){
        var wc=that.wildcardCount(Q);
        that.setState({wildcard:wc});
      });
    } else if (type=="gopage") { 
      var pageid=args[0], fileid=args[1],pagename=args[2];
      Kse.highlightPage(this.state.engine,fileid,pageid,{fulltext:true,q:this.state.Q2.query},function(data){
        that.setState({page:data,pagename:pagename});
      });
    } else if (type=="filter") {
      this.stopFiltering();
      this.filter(args[0]);
    }
    return res;
  },
  onReady:function(usage,quota) {
    if (!this.state.engine) Kde.open("jiangkangyur",function(engine){
        this.setState({engine:engine});
    },this);      
    this.setState({dialog:false,quota:quota,usage:usage});
  },
  openFileinstaller:function(autoclose) {
    if (window.location.origin.indexOf("http://127.0.0.1")==0) {
      require_kdb[0].url=window.location.origin+"/jiangkangyur.kdb";
    }
    return <fileinstaller quota="512M" autoclose={autoclose} needed={require_kdb} 
                     onReady={this.onReady}/>
  },

  render: function() { 
    if (!this.state.quota) { // install required db
        return this.openFileinstaller(true);
    } else { 
    return ( 

      <div>
      {this.state.dialog?this.openFileinstaller():null}
        <pagetext  action={this.action}  page={this.state.page} pagename={this.state.pagename} 
          className="pagetextarea" />

        <div className="row searcharea">
          <div className="col-md-4">
            <searchbox action={this.action} progress={this.state.progress} wildcard={this.state.wildcard} />
            <queryinfo action={this.action} Q={this.state.Q} />
          </div>
          <div className="col-md-8">
            <resultlist action={this.action} Q={this.state.Q2}  />
          </div>
        </div>  
      </div>
    );
   }
  }
});
module.exports=main;