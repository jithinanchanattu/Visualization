(function(e,t){typeof define=="function"&&define.amd?define(["d3","./SVGWidget","./IMenu","./Icon","./List","css!./Menu"],t):e.common_Menu=t(e.d3,e.common_SVGWidget,e.common_IMenu,e.common_Icon,e.common_List)})(this,function(e,t,n,r,i){function s(){t.call(this),n.call(this),this._icon=(new r).shape("square").diameter(14),this._list=new i;var s=this;this._list.click=function(t){e.event.stopPropagation(),s.hideMenu(),s.click(t)},this._visible=!1}return s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.prototype._class+=" common_Menu",s.prototype.implements(n.prototype),s.prototype.publishProxy("faChar","_icon",null,""),s.prototype.publishProxy("paddingPercent","_icon",null,10),s.prototype.toggleMenu=function(){this._visible?this.hideMenu():this.showMenu()},s.prototype.showMenu=function(){this.preShowMenu(),this._visible=!0,this._list.data(this.data()).render();var t=this._icon.getBBox(!0),n=this._list.getBBox(!0),r={x:t.width/2-n.width/2,y:t.height/2+n.height/2};this._list.move(r);var i=this;e.select("body").on("click."+this._id,function(){console.log("click:  body - "+i._id),i._visible&&i.hideMenu()})},s.prototype.hideMenu=function(){e.select("body").on("click."+this._id,null),this._visible=!1,this._list.data([]).render(),this.postHideMenu()},s.prototype.enter=function(n,r){t.prototype.enter.apply(this,arguments),this._icon.target(n).render(),this._list.target(n).render();var i=this;this._icon.element().on("click",function(t){e.event.stopPropagation(),i.toggleMenu()})},s.prototype.update=function(e,n){t.prototype.update.apply(this,arguments),n.classed("disabled",this.data().length===0),this._icon.faChar(this.faChar()).paddingPercent(this.paddingPercent()).render()},s});