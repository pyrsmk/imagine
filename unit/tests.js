domready(function(){

	asyncTest('Load images',function(){
		expect(1);
		i=0;
		$('img').each(function(){
			imagine(this,function(){
				++i;
			});
		});
		imagine($('img'),function(){
			ok(i==5,'All images have been loaded')
			start();
		});
	});

});
