window.imagine=function(nodes,callback){
	// Verify
	if(typeof callback!='function'){
		throw "A function is expected as callback argument";
	}
	// Normalize
	if(typeof nodes.length=='undefined'){
		nodes=[nodes];
	}
	// Prepare
	var i,j,image,src,
		loading=nodes.length,
		onload=function(){
			if(!--loading){
				callback.call(nodes);
			}
		},
		onerror=function(src){
			return function(){
				--loading;
				console.warn("An error has occured while loading '"+src+"'");
			};
		};
	// Register callbacks
	for(i=0,j=nodes.length;i<j;++i){
		image=new Image();
		image.src=nodes[i].src;
		if(image.complete===true){
			onload();
		}
		else{
			image.onload=onload;
			image.onerror=onerror(nodes[i].src);
		}
	}
};				