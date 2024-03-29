var Seismometer = function() {

	var height = 500,
		width  = 1500,
		data = [],
		line,
		canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		img1_pos = 0,
		img2_pos = -164,
		axis = 'y';

    canvas.height = 500;
    canvas.width = 1500;

	// Image
    var img1 = new Image();
    img1.onload = function(){}
    img1.src = './images/paper.png';

    var img2 = new Image();
    img2.onload = function(){}
    img2.src = './images/paper.png';
	
	var paper_effect = new Image();
    paper_effect.onload = function(){}	
    paper_effect.src = './images/paper_3d_effect.png';

	function drawGraph(data) {
		// Clear
		ctx.clearRect(0,0,width,height);

		ctx.strokeStyle = "#036";
		ctx.lineWidth =  1;
		ctx.beginPath();
		ctx.moveTo(140, 0);
		
		// Move images
//       	ctx.drawImage(img1, 2, img1_pos++);
//       	ctx.drawImage(img2, 2, img2_pos++);
//      	ctx.drawImage(paper_effect, 2, 0);

		// Loop them
		if (img1_pos >= 164) img1_pos = -164;
		if (img2_pos >= 164) img2_pos = -164;		
 
    data.each(function(item, index) {
      ctx.lineTo(300 + (60 * (-1 * item)), 0 + (index));
    });
		
    ctx.stroke();
	}
	
	return {
		'update' : function(number) {
			drawGraph(number);
		},
		'changeAxis' : function(a) {
			this.reset();
			axis = a;
		},
		'reset' : function() {
			data = [];
			drawGraph();
		}
	}

}();
