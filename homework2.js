//This function is called immediately as the script is loaded.
(function(){
	main();
}())


function main(){
	//grab the canvas context
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.font = "12px Arial";
	var fontSize = 12;
	var row = 1;
//-------------------------------------  Bisection Method  ----------------------------------------
	//Interval variables
	var a,b,c;
	var u,v,w;
	//tolerance
	var delta = 0.00001;
	//iteration
	var n = 0;
	var nMax = 30;
	var done = false;

	ctx.fillText("Equation: f(x) = x^3 - 2x^2 + x - 3",10,10);
	ctx.fillText("Tolerance = " + delta, ctx.canvas.width / 2, 10);

	a = 2;
	b = 3;
	c = (a + b) / 2;

	//Display header
	ctx.fillText("Bisection method",10, 10 + fontSize * row);
	ctx.fillText("a = " + a + " b = " + b,ctx.canvas.width / 4, 10 + fontSize * row);
	row ++;
	ctx.fillText("Iteration n", 10, 10 + fontSize * row);
	ctx.fillText("a", 10 + ctx.canvas.width / 6, 10 + fontSize * row);
	ctx.fillText("b", 10 + 2*ctx.canvas.width / 6, 10 + fontSize * row);
	ctx.fillText("c", 10 + 3*ctx.canvas.width / 6, 10 + fontSize * row);
	ctx.fillText("f(c)", 10 + 4*ctx.canvas.width / 6, 10 + fontSize * row);
	ctx.moveTo(10, 10 + fontSize * row);
	ctx.lineTo(10 + 5*ctx.canvas.width / 6, 12 + fontSize * row);
	ctx.stroke();
	row ++;

	u = f1(a);
	v = f1(b);
	w = f1(c);

	if(f1(c) == 0)
		done = !done;

	//Main loop for bisection method
	while(!done){
		u = f1(a);
		v = f1(b);
		w = f1(c);

		//ctx.fillText(n + " " + u + " " + v + " " + w,10, 10 + fontSize * (n + 2));
		ctx.fillText(n, 10, 10 + fontSize * (n + row));
		ctx.fillText(a, 10 + ctx.canvas.width / 6, 10 + fontSize * (n + row));
		ctx.fillText(b, 10 + 2*ctx.canvas.width / 6, 10 + fontSize * (n + row));
		ctx.fillText(c, 10 + 3*ctx.canvas.width / 6, 10 + fontSize * (n + row));
		ctx.fillText(w, 10 + 4*ctx.canvas.width / 6, 10 + fontSize * (n + row));
		
		//Check and make sure we haven't found the solution
		if(w == 0 || Math.abs(w) < delta || n >= nMax)
			done = !done;

		//If not done yet, update interval and continue
		if(!done){
			//Update Interval
			if(u*w < 0)
				b = c;
			else
				a = c;
			c = (a + b) / 2;
			n++;
		}
	}

//--------------------------------------  Newtons Method  ----------------------------------------

	
}

function f1 (x){
	return Math.pow(x,3) - 2 * Math.pow(x,2) + x - 3;
}