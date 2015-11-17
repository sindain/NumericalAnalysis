//--------------------------------------------------------------------------------------------------
// Filename:    homework2.js
// Class Info:  MSCS446 - 001 Numerical Analysis Fall 2015 Programming Homework #2
// Authors:     Aumann Aaron, Bartholf Trenton, Boreen Andrew, Bowe Kayla
// Created:     11/17/2015
// Description: This file contains the logic for calculating the zero of a polynomial using both
//                the bisection method and Newton's method.  It then writes the result of each
//                step to the screen.
//--------------------------------------------------------------------------------------------------


//This function is run as soon as this script is loaded.
(function(){
	main();
}())

//Main function of the program
function main(){
	//grab the canvas context
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
  
  //Set up information for writing information to the screen.
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

  //Interval is set to below
	a = 2;
	b = 3;
	c = (a + b) / 2;

	//Display header information and increment the row
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

  //Value of the function at each interval point defined above.
  //You can change the function called here to try different equations.
	u = f1(a);
	v = f1(b);
	w = f1(c);

  //check to make sure we did not get lucky and are already done.
	if(f1(c) == 0)
		done = !done;

	//Main loop for bisection method
	while(!done){
    //Find values at intervals
		u = f1(a);
		v = f1(b);
		w = f1(c);

		//Write information for this step to screen.
		ctx.fillText(n, 10, 10 + fontSize * (row));
		ctx.fillText(a, 10 + ctx.canvas.width / 6, 10 + fontSize * (row));
		ctx.fillText(b, 10 + 2*ctx.canvas.width / 6, 10 + fontSize * (row));
		ctx.fillText(c, 10 + 3*ctx.canvas.width / 6, 10 + fontSize * (row));
		ctx.fillText(w, 10 + 4*ctx.canvas.width / 6, 10 + fontSize * (row));
		row++
    
		//Check if we have found the solution
		if(Math.abs(w) < delta || n >= nMax)
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
		}//End if(!done)
	} //End while(!done)

//--------------------------------------  Newtons Method  ----------------------------------------
	//function variables
  var x = 2.5;
	var x1;
  
  //Write header information to the screen
	row += 3;
	ctx.fillText("Newtons method",10, 10 + fontSize * row);
	ctx.fillText("Initial Value x = " + x,ctx.canvas.width / 4, 10 + fontSize * row);
	row ++;
	ctx.fillText("Iteration n", 10, 10 + fontSize * row);
	ctx.fillText("x(n)", 10 + ctx.canvas.width / 4, 10 + fontSize * row);
	ctx.fillText("f(x(n))", 10 + 2*ctx.canvas.width / 4, 10 + fontSize * row);
	ctx.fillText("f'(x(n))", 10 + 3*ctx.canvas.width / 4, 10 + fontSize * row);
	ctx.moveTo(10, 10 + fontSize * row);
	ctx.lineTo(10 + 5*ctx.canvas.width / 6, 12 + fontSize * row);
	ctx.stroke();
	row ++;
  
  //Reset iteration variable and done flag
	n = 0;
	done = false;

	while(!done){
    //Do some calculations
    //You can change the function call here if you want to test other functions
		a = f1(x);
		b = f1p(x);
		x1 = x - a/b;
    
    //Write the iteration to the screen
		ctx.fillText(n, 10, 10 + fontSize * (row));
		ctx.fillText(x, 10 + ctx.canvas.width / 4, 10 + fontSize * (row));
		ctx.fillText(a, 10 + 2*ctx.canvas.width / 4, 10 + fontSize * (row));
		ctx.fillText(b, 10 + 3*ctx.canvas.width / 4, 10 + fontSize * (row));
		row++

    //Check if done
		if(Math.abs(a) < delta || Math.abs(x1 - x) < delta || Math.abs(x1 - x) / x1 < delta)
			done = !done;
    
    //If not done, increment function variable and run loop again.
		if(!done){
			x = x1;
			n ++;
		}//End if(!done)
	}//End while(!done)
	
}//End main()

//Polynomial function f1(x)
//You can redifine this function to test different polynomials.
//If you redifine this one, make sure to change f1p below to get the correct result from Newtons method
function f1 (x){
	return Math.pow(x,3) - 2 * Math.pow(x,2) + x - 3;
}//End function f1(x)

//Polynomial function f1'(x) - Derivative of f1(x) defined above
//You can redifine this function to test different polynomials
//Ensure that this function is the derivative of teh function defined above to get the correct
//solution using Newtons method.
function f1p(x){
	return 3*Math.pow(x,2) - 4 * x + 1;
}//End function f1p(x)