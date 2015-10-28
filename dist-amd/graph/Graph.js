(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/SVGWidget","../common/Palette","../api/IGraph","./Vertex","./Edge","./GraphData","./GraphLayouts","../common/Utility","css!./Graph"],t):e.graph_Graph=t(e.d3,e.common_SVGWidget,e.common_Palette,e.api_IGraph,e.graph_Vertex,e.graph_Edge,e.graph_GraphData,e.graph_GraphLayouts,e.common_Utility)})(this,function(e,t,n,r,i,s,o,u,a){function f(){t.call(this),r.call(this),this.graphData=new o,this.highlight={zoom:1.1,opacity:.33,edge:"1.25px"},this._selection=new a.Selection}return f.prototype=Object.create(t.prototype),f.prototype.constructor=f,f.prototype._class+=" graph_Graph",f.prototype.implements(r.prototype),f.prototype.publish("allowDragging",!0,"boolean","Allow Dragging of Vertices",null,{tags:["Advanced"]}),f.prototype.publish("layout","Circle","set","Default Layout",["Circle","ForceDirected","ForceDirected2","Hierarchy","None"],{tags:["Basic"]}),f.prototype.publish("scale","100%","set","Zoom Level",["all","width","selection","100%","90%","75%","50%","25%","10%"],{tags:["Basic"]}),f.prototype.publish("applyScaleOnLayout",!1,"boolean","Shrink to fit on Layout",null,{tags:["Basic"]}),f.prototype.publish("highlightOnMouseOverVertex",!1,"boolean","Highlight Vertex on Mouse Over",null,{tags:["Basic"]}),f.prototype.publish("highlightOnMouseOverEdge",!1,"boolean","Highlight Edge on Mouse Over",null,{tags:["Basic"]}),f.prototype.publish("transitionDuration",250,"number","Transition Duration",null,{tags:["Intermediate"]}),f.prototype.publish("showEdges",!0,"boolean","Show Edges",null,{tags:["Intermediate"]}),f.prototype.publish("snapToGrid",0,"number","Snap to Grid",null,{tags:["Private"]}),f.prototype.publish("hierarchyRankDirection","TB","set","Direction for Rank Nodes",["TB","BT","LR","RL"],{tags:["Advanced"]}),f.prototype.publish("hierarchyNodeSeparation",50,"number","Number of pixels that separate nodes horizontally in the layout",null,{tags:["Advanced"]}),f.prototype.publish("hierarchyEdgeSeparation",10,"number","Number of pixels that separate edges horizontally in the layout",null,{tags:["Advanced"]}),f.prototype.publish("hierarchyRankSeparation",50,"number","Number of pixels between each rank in the layout",null,{tags:["Advanced"]}),f.prototype.getOffsetPos=function(){return{x:0,y:0}},f.prototype.size=function(e){var n=t.prototype.size.apply(this,arguments);return arguments.length&&this._svgZoom&&this._svgZoom.attr("x",-this._size.width/2).attr("y",-this._size.height/2).attr("width",this._size.width).attr("height",this._size.height),n},f.prototype.clear=function(){this.data({vertices:[],edges:[],hierarchy:[],merge:!1})},f.prototype.data=function(e){var n=t.prototype.data.apply(this,arguments);if(arguments.length){this.data().merge||(this.graphData=new o,this._renderCount=0);var r=this.graphData.setData(this.data().vertices,this.data().edges,this.data().hierarchy,this.data().merge),i=this;r.addedVertices.forEach(function(e){e.pos({x:+Math.random()*10/2-5,y:+Math.random()*10/2-5})}),r.addedEdges.forEach(function(e){e._sourceMarker&&(e._sourceMarker=i._id+"_"+e._sourceMarker),e._targetMarker&&(e._targetMarker=i._id+"_"+e._targetMarker)});var s={};this.graphData.edgeValues().forEach(function(e){s[e._sourceVertex._id]||(s[e._sourceVertex._id]={}),s[e._sourceVertex._id][e._targetVertex._id]||(s[e._sourceVertex._id][e._targetVertex._id]=0);var t=++s[e._sourceVertex._id][e._targetVertex._id];e.arcDepth(16*t)})}return n},f.prototype.selection=function(e){return arguments.length?(this._selection.set(e),this):this._selection.get()},f.prototype.setZoom=function(e,t,n){this.zoom&&(this.zoom.translate(e),this.zoom.scale(t),this.applyZoom(n))},f.prototype.applyZoom=function(t){e.event&&e.event.sourceEvent&&!e.event.sourceEvent.ctrlKey&&(e.event.sourceEvent.type==="wheel"||e.event.sourceEvent.type==="mousewheel"||e.event.sourceEvent.type==="DOMMouseScroll")&&e.event.sourceEvent.wheelDelta&&(this.zoom.translate([this.prevTranslate[0],this.prevTranslate[1]+e.event.sourceEvent.wheelDelta]),this.zoom.scale(this.prevScale)),(t?this.svg.transition().duration(t):this.svg).attr("transform","translate("+this.zoom.translate()+")scale("+this.zoom.scale()+")"),this.prevTranslate=this.zoom.translate(),this.prevScale!==this.zoom.scale()&&(this._fixIEMarkers(),this.prevScale=this.zoom.scale()),this.brush.x(e.scale.identity().domain([(-this.prevTranslate[0]-this._size.width/2)*1/this.zoom.scale(),(-this.prevTranslate[0]+this._size.width/2)*1/this.zoom.scale()])),this.brush.y(e.scale.identity().domain([(-this.prevTranslate[1]-this._size.height/2)*1/this.zoom.scale(),(-this.prevTranslate[1]+this._size.height/2)*1/this.zoom.scale()]))},f.prototype.enter=function(n,r){function s(t){if(i.allowDragging()){e.event.sourceEvent.stopPropagation(),i._dragging=!0;if(i.forceLayout){var n=i.forceLayout.vertexMap[t.id()];n.fixed=!0}i.svgMarkerGlitch&&i.graphData.nodeEdges(t.id()).forEach(function(e){var t=i.graphData.edge(e);i._pushMarkers(t.element(),t)})}}function o(t){if(i.allowDragging()){e.event.sourceEvent.stopPropagation(),t.move({x:e.event.x,y:e.event.y});if(i.forceLayout){var n=i.forceLayout.vertexMap[t.id()];n.fixed=!0,n.x=n.px=e.event.x,n.y=n.py=e.event.y}i.refreshIncidentEdges(t,!0)}}function u(t){if(i.allowDragging()){e.event.sourceEvent.stopPropagation(),i._dragging=!1;if(i.snapToGrid()){var n=t.calcSnap(i.snapToGrid());t.move(n[0]),i.refreshIncidentEdges(t,!0)}if(i.forceLayout){var r=i.forceLayout.vertexMap[t.id()];r.fixed=!1}i.svgMarkerGlitch&&i.graphData.nodeEdges(t.id()).forEach(function(e){var t=i.graphData.edge(e);i._popMarkers(t.element(),t)})}}t.prototype.enter.apply(this,arguments);var i=this;this.prevTranslate=[0,0],this.prevScale=1,this.zoom=e.behavior.zoom().scaleExtent([.01,4]).on("zoomstart",function(t){i.prevTranslate=i.zoom.translate(),i.prevScale=i.zoom.scale(),e.event.sourceEvent&&e.event.sourceEvent.shiftKey&&e.event.sourceEvent.ctrlKey?i._zoomMode="selection":e.event.sourceEvent&&e.event.sourceEvent.shiftKey?(i._zoomMode="selection",i._selection.clear()):i._zoomMode="zoom";switch(i._zoomMode){case"selection":r.select(".extent").style("visibility",null);break;default:r.select(".extent").style("visibility","hidden")}}).on("zoomend",function(e){switch(i._zoomMode){case"selection":i.zoom.translate(i.prevTranslate),i.zoom.scale(i.prevScale);break;default:}i._svgBrush.call(i.brush.clear())}).on("zoom",function(e){switch(i._zoomMode){case"selection":break;default:i.applyZoom()}}),this.brush=e.svg.brush().x(e.scale.identity().domain([-i._size.width/2,i._size.width/2])).y(e.scale.identity().domain([-i._size.height/2,i._size.height/2])).on("brushstart",function(e){switch(i._zoomMode){case"selection":break;default:}}).on("brushend",function(t){switch(i._zoomMode){case"selection":var n=e.event.target.extent();i.svgV.selectAll(".graphVertex").select("*").each(function(e){n[0][0]<=e.x()&&e.x()<n[1][0]&&n[0][1]<=e.y()&&e.y()<n[1][1]&&i._selection.append(e)}),i.graph_selection(i.selection());break;default:}}).on("brush",function(){switch(i._zoomMode){case"selection":var t=i.zoom.translate();console.log(t[0]);var n=e.event.target.extent();i.svgV.selectAll(".graphVertex").select("*").classed("selected",function(e){return i._selection.isSelected(e)||n[0][0]<=e.x()&&e.x()<n[1][0]&&n[0][1]<=e.y()&&e.y()<n[1][1]});break;default:}}),this.drag=e.behavior.drag().origin(function(e){return e.pos()}).on("dragstart",s).on("dragend",u).on("drag",o),this._svgZoom=r.append("rect").attr("class","zoom").attr("x",-this._size.width/2).attr("y",-this._size.height/2).attr("width",this._size.width).attr("height",this._size.height),this.defs=r.append("defs"),this.addMarkers(),r.call(this.zoom),this.svg=r.append("g"),this._svgBrush=this.svg.append("g").attr("class","selectionBrush").call(this.brush),this._svgBrush.select(".background").style("cursor",null),i._svgBrush.call(i.brush.clear()),this.svgC=this.svg.append("g").attr("id",this._id+"C"),this.svgE=this.svg.append("g").attr("id",this._id+"E"),this.svgV=this.svg.append("g").attr("id",this._id+"V")},f.prototype.getBounds=function(e,t){var n=[[null,null],[null,null]];return e.forEach(function(e){var r=t?t.nodePos(e._id):{x:e.x(),y:e.y(),width:e.width(),height:e.height()},i=r.x-r.width/2,s=r.x+r.width/2,o=r.y-r.height/2,u=r.y+r.height/2;if(n[0][0]===null||n[0][0]>i)n[0][0]=i;if(n[0][1]===null||n[0][1]>o)n[0][1]=o;if(n[1][0]===null||n[1][0]<s)n[1][0]=s;if(n[1][1]===null||n[1][1]<u)n[1][1]=u}),n},f.prototype.getVertexBounds=function(e){return this.getBounds(this.graphData.nodeValues(),e)},f.prototype.getSelectionBounds=function(e){return this.getBounds(this._selection.get(),e)},f.prototype.shrinkToFit=function(e,t){var n=this.width(),r=this.height(),i=e[1][0]-e[0][0],s=e[1][1]-e[0][1],o=(e[0][0]+e[1][0])/2,u=(e[0][1]+e[1][1])/2,a=1/Math.max(i/n,s/r);a>1&&(a=1);var f=[-a*o,-a*u];this.setZoom(f,a,t)},f.prototype._origScale=f.prototype.scale,f.prototype.scale=function(e,t){var n=f.prototype._origScale.apply(this,arguments);return arguments.length&&this.zoomTo(e,t),n},f.prototype.zoomTo=function(e,t){switch(e){case"all":this.shrinkToFit(this.getVertexBounds(),t);break;case"width":var n=this.getVertexBounds();n[0][1]=0,n[1][1]=0,this.shrinkToFit(n,t);break;case"selection":this.shrinkToFit(this._selection.isEmpty()?this.getVertexBounds():this.getSelectionBounds(),t);break;default:var r=parseInt(e);if(isNaN(r)||r<=0||r>200)r=100;this.zoom.scale(r/100),this.applyZoom(t)}},f.prototype.centerOn=function(e,t){var n=(e[0][0]+e[1][0])/2,r=(e[0][1]+e[1][1])/2,i=[n,r];this.setZoom(i,1,t)},f.prototype._origLayout=f.prototype.layout,f.prototype.layout=function(e,t){var n=f.prototype._origLayout.apply(this,arguments);if(arguments.length&&this._renderCount){this.forceLayout&&(this.forceLayout.force.stop(),this.forceLayout=null);var r=this,i=this.getLayoutEngine();if(this.layout()==="ForceDirected2")this.forceLayout=i,this.forceLayout.force.on("tick",function(e){i.vertices.forEach(function(e){var t=r.graphData.node(e.id);e.fixed?(e.x=e.px,e.y=e.py):(e.px=e.x,e.py=e.y,t.move({x:e.x,y:e.y}))}),r.graphData.edgeValues().forEach(function(e){e.points([],!1,!1)});if(r.applyScaleOnLayout()){var t=r.getVertexBounds(i);r.shrinkToFit(t)}}),this.forceLayout.force.start();else if(i){this.forceLayout=null,r._dragging=!0,r.graphData.nodeValues().forEach(function(e){var n=i.nodePos(e._id);e.move({x:n.x,y:n.y},t),n.width&&n.height&&!e.width()&&!e.height()&&e.width(n.width).height(n.height).render()}),r.graphData.edgeValues().forEach(function(e){var n=i.edgePoints(e);e.points(n,t)});if(r.applyScaleOnLayout()){var s=r.getVertexBounds(i);r.shrinkToFit(s,t)}this._fixIEMarkers(),setTimeout(function(){r._dragging=!1},t?t+50:50)}}return n},f.prototype.update=function(n,r){function o(e){e.target(this).render(),e.element().call(i.drag),e.dispatch&&(e.dispatch.on("sizestart",function(e,t){e.allowResize(i.allowDragging()),i.allowDragging()&&(i._dragging=!0)}),e.dispatch.on("size",function(e,t){i.refreshIncidentEdges(e,!1)}),e.dispatch.on("sizeend",function(e,t){i._dragging=!1;if(i.snapToGrid()){var n=e.calcSnap(i.snapToGrid());e.pos(n[0]).size(n[1]).render(),i.refreshIncidentEdges(e,!1)}}))}function a(e){e.target(this).render()}function f(e){e.render()}function l(e){e.render()}t.prototype.update.apply(this,arguments);var i=this,s=this.svgV.selectAll("#"+this._id+"V > .graphVertex").data(this.graphData.nodeValues(),function(e){return e.id()});s.enter().append("g").attr("class","graphVertex").style("opacity",1e-6).on("click.selectionBag",function(t){i._selection.click(t,e.event)}).on("click",function(t){i.vertex_click(t,e.event)}).on("dblclick",function(t){i.vertex_dblclick(t,e.event)}).on("mouseover",function(t){if(i._dragging)return;i.vertex_mouseover(e.select(this),t)}).on("mouseout",function(t){if(i._dragging)return;i.vertex_mouseout(e.select(this),t)}).each(o).transition().duration(750).style("opacity",1);var u=this.svgE.selectAll("#"+this._id+"E > .edge").data(this.showEdges()?this.graphData.edgeValues():[],function(e){return e.id()});u.enter().append("g").attr("class","edge").style("opacity",1e-6).on("click",function(e){i.edge_click(e)}).on("mouseover",function(t){if(i._dragging)return;i.edge_mouseover(e.select(this),t)}).on("mouseout",function(t){if(i._dragging)return;i.edge_mouseout(e.select(this),t)}).each(a).transition().duration(750).style("opacity",1),s.each(f),u.each(l),s.exit().each(function(e){e.target(null)}).remove(),u.exit().each(function(e){e.target(null)}).remove(),this._renderCount||(this._renderCount++,this.setZoom([0,0],1),this.layout(this.layout()))},f.prototype.getLayoutEngine=function(){switch(this.layout()){case"Circle":return new u.Circle(this.graphData,this._size.width,this._size.height);case"ForceDirected":return new u.ForceDirected(this.graphData,this._size.width,this._size.height,!0);case"ForceDirected2":return new u.ForceDirected(this.graphData,this._size.width,this._size.height);case"Hierarchy":return new u.Hierarchy(this.graphData,this._size.width,this._size.height,{rankdir:this.hierarchyRankDirection(),nodesep:this.hierarchyNodeSeparation(),edgesep:this.hierarchyEdgeSeparation(),ranksep:this.hierarchyRankSeparation()})}return null},f.prototype.getNeighborMap=function(e){var t={},n={};if(e){var r=this.graphData.nodeEdges(e.id());for(var i=0;i<r.length;++i){var s=this.graphData.edge(r[i]);n[s.id()]=s,s._sourceVertex.id()!==e.id()&&(t[s._sourceVertex.id()]=s._sourceVertex),s._targetVertex.id()!==e.id()&&(t[s._targetVertex.id()]=s._targetVertex)}}return{vertices:t,edges:n}},f.prototype.highlightVerticies=function(e){var t=this,n=this.svgV.selectAll(".graphVertex");return n.transition().duration(this.transitionDuration()).each("end",function(t){e&&e[t.id()]&&t._parentElement.node()&&t._parentElement.node().parentNode&&t._parentElement.node().parentNode.appendChild(t._parentElement.node())}).style("opacity",function(n){return!e||e[n.id()]?1:t.highlight.opacity}),this},f.prototype.highlightEdges=function(e){var t=this,n=this.svgE.selectAll(".edge");return n.style("stroke-width",function(n){return e&&e[n.id()]?t.highlight.edge:"1px"}).transition().duration(this.transitionDuration()).style("opacity",function(n){return!e||e[n.id()]?1:t.highlight.opacity}),this},f.prototype.highlightVertex=function(e,t){if(this.highlightOnMouseOverVertex())if(t){var n=this.getNeighborMap(t);n.vertices[t.id()]=t,this.highlightVerticies(n.vertices),this.highlightEdges(n.edges)}else this.highlightVerticies(null),this.highlightEdges(null)},f.prototype.highlightEdge=function(e,t){if(this.highlightOnMouseOverEdge())if(t){var n={};n[t._sourceVertex.id()]=t._sourceVertex,n[t._targetVertex.id()]=t._targetVertex;var r={};r[t.id()]=t,this.highlightVerticies(n),this.highlightEdges(r)}else this.highlightVerticies(null),this.highlightEdges(null)},f.prototype.refreshIncidentEdges=function(e,t){var n=this;this.graphData.nodeEdges(e.id()).forEach(function(e){var r=n.graphData.edge(e);r.points([],!1,t)})},f.prototype.graph_selection=function(e){},f.prototype.vertex_click=function(e){e._parentElement.node().parentNode.appendChild(e._parentElement.node()),r.prototype.vertex_click.apply(this,arguments)},f.prototype.vertex_dblclick=function(e){},f.prototype.vertex_mouseover=function(e,t){this.highlightVertex(e,t)},f.prototype.vertex_mouseout=function(e,t){this.highlightVertex(null,null)},f.prototype.edge_mouseover=function(e,t){this.highlightEdge(e,t)},f.prototype.edge_mouseout=function(e,t){this.highlightEdge(null,null)},f.prototype.addMarkers=function(e){e&&(this.defs.select("#"+this._id+"_arrowHead").remove(),this.defs.select("#"+this._id+"_circleFoot").remove(),this.defs.select("#"+this._id+"_circleHead").remove()),this.defs.append("marker").attr("class","marker").attr("id",this._id+"_arrowHead").attr("viewBox","0 0 10 10").attr("refX",10).attr("refY",5).attr("markerWidth",8).attr("markerHeight",8).attr("markerUnits","strokeWidth").attr("orient","auto").append("polyline").attr("points","0,0 10,5 0,10 1,5"),this.defs.append("marker").attr("class","marker").attr("id",this._id+"_circleFoot").attr("viewBox","0 0 10 10").attr("refX",1).attr("refY",5).attr("markerWidth",7).attr("markerHeight",7).attr("markerUnits","strokeWidth").attr("orient","auto").append("circle").attr("cx",5).attr("cy",5).attr("r",4),this.defs.append("marker").attr("class","marker").attr("id",this._id+"_circleHead").attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerWidth",7).attr("markerHeight",7).attr("markerUnits","strokeWidth").attr("orient","auto").append("circle").attr("cx",5).attr("cy",5).attr("r",4)},f});