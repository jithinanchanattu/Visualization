(function(e,t){typeof define=="function"&&define.amd?define(["d3","./Class","./Platform","./PropertyExt","./Database"],t):e.common_Widget=t(e.d3,e.common_Class,e.common_Platform,e.common_PropertyExt,e.common_Database)})(this,function(e,t,n,r,i){function o(){t.call(this),n.call(this),r.call(this),this._class=Object.getPrototypeOf(this)._class,this._id=this._idSeed+s++,this._db=new i.Grid,this._pos={x:0,y:0},this._size={width:0,height:0},this._scale=1,this._visible=!0,this._target=null,this._parentElement=null,this._parentWidget=null,this._element=e.select(),this._renderCount=0,window.__hpcc_debug&&(window.g_all===undefined&&(window.g_all={}),window.g_all[this._id]=this),window.__hpcc_theme&&this.applyTheme(window.__hpcc_theme)}var s=0;return o.prototype=Object.create(t.prototype),o.prototype.constructor=o,o.prototype.mixin(n),o.prototype.mixin(r),o.prototype._class+=" common_Widget",o.prototype._idSeed="_w",o.prototype.publishProxy("fields","_db","fields"),o.prototype.publish("classed",{},"object","HTML Classes",null,{tags:["Private"]}),o.prototype.export=function(e){switch(e){case"TSV":return this._db.tsv();case"JSON":return this._db.json()}return this._db.csv()},o.prototype.leakCheck=function(e){var t=this,n=[e],r=new this.MutationObserver(function(e){var i=!1;e.forEach(function(e){for(var s=0;s<e.removedNodes.length;++s){var o=e.removedNodes.item(s);n.indexOf(o)>=0&&t._target&&(i=!0,r.disconnect())}}),i&&console.log("leak:  "+t.id()+" - "+t.classID()+"		widget.target(null); was not called for this widget before it was removed from the page.")}),i=e.parentNode;while(i)r.observe(i,{childList:!0}),n.push(i),i=i.parentNode},o.prototype.on=function(t,n,r){if(this[t]===undefined)throw"Method:  "+t+" does not exist.";var i=this[t];return this[t]=function(){r?e.event&&e.event.stopPropagation():i.apply(this,arguments),n.apply(this,arguments)},this},o.prototype.id=function(e){return arguments.length?(this._id=e,this):this._id},o.prototype.columns=function(e){return arguments.length?(this._db.legacyColumns(e),this):this._db.legacyColumns()},o.prototype.parsedData=function(){return this._db.parsedData()},o.prototype.formattedData=function(){return this._db.formattedData()},o.prototype.data=function(e){return arguments.length?(this._db.legacyData(e),this):this._db.legacyData()},o.prototype.cloneData=function(){return this.data().map(function(e){return e.slice(0)})},o.prototype.flattenData=function(){var e=[];return this.data().forEach(function(t,n){this.columns().filter(function(e,t){return t>0}).forEach(function(r,i){var s=t[i+1];if(s){var o={rowIdx:n,colIdx:i+1,label:t[0],value:s};e.push(o)}},this)},this),e},o.prototype.rowToObj=function(e){var t={};return this.columns().forEach(function(n,r){t[n]=e[r]}),e.length===this.columns().length+1&&(t.__lparam=e[this.columns().length]),t},o.prototype.pos=function(e){return arguments.length?(this._pos=e,this._overlayElement&&this._overlayElement.attr("transform","translate("+e.x+","+e.y+")scale("+this._scale+")"),this):this._pos},o.prototype.x=function(e){return arguments.length?(this.pos({x:e,y:this._pos.y}),this):this._pos.x},o.prototype.y=function(e){return arguments.length?(this.pos({x:this._pos.x,y:e}),this):this._pos.y},o.prototype.size=function(e){return arguments.length?(this._size=e,this._overlayElement&&this._overlayElement.attr("width",e.width).attr("height",e.height),this):this._size},o.prototype.width=function(e){return arguments.length?(this.size({width:e,height:this._size.height}),this):this._size.width},o.prototype.height=function(e){return arguments.length?(this.size({width:this._size.width,height:e}),this):this._size.height},o.prototype.resize=function(e,t){t=t||{width:0,height:0};var n,r;if(e&&e.width&&e.height)n=e.width,r=e.height;else{var i=window.getComputedStyle(this._target,null);n=parseFloat(i.getPropertyValue("width"))-t.width,r=parseFloat(i.getPropertyValue("height"))-t.height}return this.size({width:n,height:r}),this},o.prototype.scale=function(e){return arguments.length?(this._scale=e,this._overlayElement&&this._overlayElement.attr("transform","translate("+e.x+","+e.y+")scale("+this._scale+")"),this):this._scale},o.prototype.visible=function(e){return arguments.length?(this._visible=e,this._parentElement&&this._parentElement.style({visibility:this._visible?null:"hidden",opacity:this._visible?null:0}),this):this._visible},o.prototype.display=function(e){return arguments.length?(this._display=e,this._element&&this._element.style("display",this._display?null:"none"),this):this._display},o.prototype.calcSnap=function(e){function t(e,t){function n(e,t){var n=e%t;return Math.abs(n)>t-Math.abs(n)&&(n=(t-Math.abs(n))*(n<0?1:-1)),n}return e-n(e,t)}var n=t(this._pos.x-this._size.width/2,e),r=t(this._pos.y-this._size.height/2,e),i=t(this._pos.x+this._size.width/2,e),s=t(this._pos.y+this._size.height/2,e),o=i-n,u=s-r;return[{x:n+o/2,y:r+u/2},{width:o,height:u}]},o.prototype.toWidget=function(t){if(!t)return null;var n=e.select(t);if(n){var r=n.datum();if(r&&r instanceof o)return r}return null},o.prototype.locateParentWidget=function(e){e=e||this._target.parentNode;var t=this.toWidget(e);return t?t:this.locateParentWidget(e.parentNode)},o.prototype.locateSVGNode=function(e){return e?e.tagName==="svg"?e:this.locateSVGNode(e.parentNode):null},o.prototype.locateOverlayNode=function(){var e=this.locateParentWidget(this._target);while(e){if(e._parentOverlay)return e._parentOverlay;e=this.locateParentWidget(e._target.parentNode)}return null},o.prototype.getAbsolutePos=function(e,t,n){var r=this.locateSVGNode(e);if(!r)return null;var i=r.createSVGPoint(),s=e.getCTM();i=i.matrixTransform(s);var o={x:i.x,y:i.y};if(t!==undefined&&n!==undefined){var u=r.createSVGPoint();u.x=t,u.y=n,u=u.matrixTransform(s),o.width=u.x-i.x,o.height=u.y-i.y}return o},o.prototype.hasOverlay=function(){return this._overlayElement},o.prototype.syncOverlay=function(){if(this._size.width&&this._size.height){var e=this.getAbsolutePos(this._overlayElement.node(),this._size.width,this._size.height);if(e&&(this.oldPos===null||this.oldPos===undefined||e.x!==this.oldPos.x||e.y!==this.oldPos.y||e.width!==this.oldPos.width||e.height!==this.oldPos.height)){var t=e.width/this._size.width,n=e.height/this._size.height;this._parentElement.style({left:e.x-e.width/t/2+"px",top:e.y-e.height/n/2+"px",width:e.width/t+"px",height:e.height/n+"px"});var r="scale("+t+","+n+")";this._parentElement.style("transform",r).style("-moz-transform",r).style("-ms-transform",r).style("-webkit-transform",r).style("-o-transform",r)}this.oldPos=e}},o.prototype.element=function(){return this._element},o.prototype.node=function(){return this._element.node()},o.prototype.render=function(t){if(window.__hpcc_debug){var n=Date.now();n-this._prevNow<500&&console.log("Double Render:  "+(n-this._prevNow)+" - "+this.id()+" - "+this.classID()),this._prevNow=n}t=t||function(){};if(!this.visible())return t(this),this;if(this._parentElement){if(!this._tag)throw"No DOM tag specified";var r=this._parentElement.selectAll("#"+this._id).data([this],function(e){return e._id});r.enter().append(this._tag).classed(this._class,!0).attr("id",this._id).each(function(t){t._element=e.select(this),t.enter(this,t._element),window.__hpcc_debug&&t.leakCheck(this)}),r.classed(this.classed()).each(function(e){e.preUpdate(this,e._element),e.update(this,e._element),e.postUpdate(this,e._element)}),r.exit().each(function(t){e.select(this).datum(null),t.exit(this,t._element)}).remove(),this._renderCount++}var i=[];this.publishedProperties(!0).forEach(function(e){if(!e.ext||e.ext.render!==!1)switch(e.type){case"widget":var t=this[e.id]();t&&i.push(this[e.id]());break;case"widgetArray":i=i.concat(this[e.id]())}},this);var s=this;switch(i.length){case 0:t(this);break;case 1:i[0].render(function(){t(s)});break;default:var o=i.length;i.forEach(function(e,n){setTimeout(function(){e.render(function(){--o===0&&t(s)})},0)})}return this},o.prototype.lazyRender=o.prototype.debounce(function(){this.render()},100),o.prototype.enter=function(e,t){},o.prototype.preUpdate=function(e,t){},o.prototype.update=function(e,t){},o.prototype.postUpdate=function(e,t){},o.prototype.exit=function(e,t){},o});