domready(function(){

	asyncTest('Then',function(){
		expect(2);
		var i=0;
		$('img').each(function(){
			imagine(this).then(function(){
							if(this[0].complete){
								++i;
							}
						 })
						 .catch(function(e){
							++i;
						 });
		});
		imagine($('img')).then(function(){
							ok(i==5,'Number of loaded images');
							ok(typeof this[0]=='object' && this.length==5,'this keyword')
							start();
						 })
						 .catch(function(e){
							ok(false,e);
						 });
	});

	asyncTest('Preloading',function(){
		expect(1);
		var srcs=[
				'images/awesomest_tea_ever_by_thekitty222-d6qukux.jpg',
				'images/cA6Qb.jpg',
				'images/fFeL0.jpg',
				'images/nNLK8.jpg',
				'images/ujICp.jpg'
			];
		imagine(srcs).then(function(){
						ok(typeof this[0]=='string' && this.length==5)
						start();
					 })
					 .catch(function(e){
						ok(false,e);
					 });
	});

	asyncTest('Catch',function(){
		expect(3);
		var srcs=[
				'images/awesomest_tea_ever_by_thekitty222-d6qukux.jpg',
				'http://google.com/null.png',
				'http://example.com'
			];
		imagine(srcs).then(function(){
						ok(this[0]=='images/awesomest_tea_ever_by_thekitty222-d6qukux.jpg' && this.length==1);
						start();
					 })
					 .catch(function(e){
						ok(this=='http://google.com/null.png' || this=='http://example.com');
					 });
	});

});
