app.factory('planeGraph', [ '$q', function( $q ){
	var cy;
	var planeGraph = function(planes){
		var deferred = $q.defer();
		
		// put planes model in cy.js
		var eles = [];
		for( var i = 0; i < planes.length; i++ ){
			eles.push({
				group: 'nodes',
				data: {
					id: planes[i].id,
					weight: planes[i].weight,
					name: planes[i].name
				}
			});
		}
		
		$(function(){ // on dom ready
			
			cy = cytoscape({
				container: $('#cy')[0],

				textureOnViewport: false,
				motionBlur: false,
				
				style: cytoscape.stylesheet()
					.selector('node')
						.css({
							'height': 7,
							'width': 7,
							'text-valign': 'center',
							'color': '#fff',
							'text-outline-width': 2
						 })
					.selector(':selected')
						.css({
							'content': 'data(name)',
							'line-color': 'white',
							'margin-bottom': '20px'
					}),

				layout: {
					name: 'cose',
					padding: 10
				},
				
				elements: eles,

				ready: function(){
					deferred.resolve( this );
					
					cy.on('cxtdrag', 'node', function(e){
						var node = this;
						var dy = Math.abs( e.cyPosition.x - node.position().x );
						var weight = Math.round( dy*2 );
						
						node.data('weight', weight);
						
						fire('onWeightChange', [ node.id(), node.data('weight') ]);
					});
				}
			});

		}); // on dom ready
		
		return deferred.promise;
	};
	
	planeGraph.listeners = {};
	
	function fire(e, args){
		var listeners = planeGraph.listeners[e];
		
		for( var i = 0; listeners && i < listeners.length; i++ ){
			var fn = listeners[i];
			
			fn.apply( fn, args );
		}
	}
	
	function listen(e, fn){
		var listeners = planeGraph.listeners[e] = planeGraph.listeners[e] || [];
		
		listeners.push(fn);
	}
	
	planeGraph.setPersonWeight = function(id, weight){
		cy.$('#' + id).data('weight', weight);
	};
	
	planeGraph.onWeightChange = function(fn){
		listen('onWeightChange', fn);
	};
	
	return planeGraph;
	
	
} ]);