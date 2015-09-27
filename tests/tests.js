domready(function(){

	QUnit.test('Then', function(assert) {
		var done = assert.async();
		assert.expect(2);
		$('img').each(function() {
			imagine(this).then();
		});
		imagine($('img')).then(function(images) {
							assert.ok(images.length == 5, 'Number of loaded images = '+images.length);
							assert.ok(typeof images[0] == 'object', 'typeof image = '+(typeof images[0]));
							done();
						 })
						 .catch(function(images) {
							assert.ok(false, e);
							done();
						 });
	});

	QUnit.test('Preloading', function(assert) {
		var done = assert.async();
		assert.expect(1);
		var srcs=[
				'images/awesomest_tea_ever_by_thekitty222-d6qukux.jpg',
				'images/cA6Qb.jpg',
				'images/fFeL0.jpg',
				'images/nNLK8.jpg',
				'images/ujICp.jpg'
			];
		imagine(srcs).then(function(images) {
						assert.ok(images.length == 5);
						done();
					 })
					 .catch(function(images) {
						assert.ok(false, e);
						done();
					 });
	});

	QUnit.test('Catch', function(assert) {
		var done = assert.async();
		assert.expect(1);
		var srcs=[
				'images/awesomest_tea_ever_by_thekitty222-d6qukux.jpg',
				'images/null.png',
				'http://google.com/null.png',
				'http://example.com'
			];
		imagine(srcs).then(function(images) {
						assert.ok(false);
						done();
					 })
					 .catch(function(images) {
						assert.ok(images.length == 3);
						done();
					 });
	});

});
