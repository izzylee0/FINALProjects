var app = {

	//A place to set up listeners or kick off an initial function
	initialize: function() {
		$("#search").unbind("click").click(function(){ 
			console.log("Clicked search"); 
			//clear image div in html
		$("#images").html("");
			//clear track title in html
		$("#searchResults").html("");
		$("#searchResults").resizable();
			//using jquery to get value of query input box
		var newSearchTerm = $("#query").val(); //new
		console.log(newSearchTerm); //had 'currentWord' before
		//Execute the API call function with the 'newSearchTerm' as the argument
		app.searchCoopHew(newSearchTerm); 
		app.searchlastFM(newSearchTerm);

	});

	 //Use jQuery to assign a callback function when enter is pressed 
		//This will ONLY work when the 'query' input box is active
		$("#query").keypress(function(e){ //new
			//console.log(e);
			//If enter key is pressed
			if (e.which == 13){
				//Use jQuery's trigger() function to execute the click event
				$("#search").trigger('click');

			}
		});
	},


	//Define a function to execute the first AJAX call
	//The argument will be the desired search term
	searchCoopHew: function(searchTerm) { 
		console.log("Executing the searchCoopHew function");
		var CoopHewURL = "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.collection&access_token=1d116fb113749c6ce9d8512c7fca76e1&color=";
		$.ajax({
			url: CoopHewURL + searchTerm + "&type=drawing", 
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("We got problems");
				console.log(data.status);
			},
			success: function(data){
				// this is getting triggered twice by something!
				console.log("Woohoo!");
				console.log(data);
				
				//for (var i = 0; i < data.objects.length; i++){

				//dont access properties that might not be there, only make your random numer
				//as large as your results array
				var randomImgNum = Math.floor(Math.random() * data.objects.length);
				console.log(randomImgNum);
				if (data.objects[randomImgNum]) {
					var searchResults = data.objects[randomImgNum].images[0].b.url; 
					console.log(searchResults);

					//you can call a p5 function from here!
					loadTheImage(searchResults);
					//var img = $('<img />',
					//{src: searchResults})
					//.appendTo($('#images'));
					//app.searchCoopHew(data);
				}
				

			}
		});
	},


	searchlastFM: function(newSearchTerm) {
		console.log("Executing the searchlastFM function");
		var lastFMurl = "http://ws.audioscrobbler.com/2.0/?method=track.search";
		var apiKey = "&api_key=c159d029669c344a465bc813cfc9f2b8";
		var lastFMalbumURL = lastFMurl + "&track=" + newSearchTerm + apiKey + "&format=json";
		$.ajax({
			url: lastFMalbumURL,
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("We got problems");
				console.log(data.status);
			},
			success: function(data){
				console.log("Woohoo!");
				console.log(data);
					//for (var i = 0; i < data.results.length; i++){
				var randomTrackNum = Math.floor(Math.random() * 30);
				//console.log(randomTrackNum);
				var searchResults = data.results.trackmatches.track[randomTrackNum].name; //in future iteration would like to choose randomly from top 50 tracks 
				console.log(searchResults);
				// var htmlString = "<p class='lastFMresults'>" + searchResults + "</p>";
				// $("#searchResults").append(htmlString);
				// document.getElementById("searchResults").contentEditable='true';
				// $("#searchResults").draggable();
    // 			$( "#searchResults").resizable();
    			songTitle = searchResults;
  			
	
			}
		
		});


		songTitle = searchResults;	
    		
		//options for user to change text in any way they would like 
	
   		//$('#searchResults').css("font-family", $(this).val());
		//});
		//$("#right-arrow").click(function(){
	
		
		// syntax error
		//$(window).load(function(){
		//	$("#searchResults").resizable();
		//});
		
$("#saveCanvas").click(function(){
 	saveCanvas('My Album Cover','jpg');
 	});

	},
	

};


//add variables for songTitle string and font string
var theImage, font, fontSize, fontColor, songTitle, loaded, showTint = false;

//green variabe for tint, unlocked boolean
var g, unlocked = false;


// p5 code shouldn't be inside another object, keep it global
function setup() {
	console.log("Setup");
	var canvas = createCanvas(1500, 540);
	canvas.parent("sketchHolder");

	app.initialize();
	font = "Arial";
	fontSize = "24";
	fontColor = 255;
	// set an initial condition

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

$("#fonts").change(function() {
    	//alert($(this).val());
    		// set global font variable to select option
	font = $(this).val();
 });

$("#size").change(function() {
	fontSize = $(this).val();
	   	// 	$('#searchResults').css("font-size", $(this).val() + "px");
		});

$("#color").change(function() {
		fontColor = $(this).val();
		});

function draw() {
	clear();
		
	//if unlocked is true, set the green value equal to the mouse
	if (unlocked) {
		// get g equal to a value between 0 - 255 that corresponds to the x pos on the canvas
		g = map(mouseX, 0, width, 0, 255);
		y = map(mouseY, 0, height, 0, 255);
	}
	
	if (theImage){
		//tint(0, g, 0);
		console.log(showTint);
		 
		if (showTint) {
	 		 tint(0, g, 204);  // Tint blue
		}

 		 image(theImage, 0, 0);
  		
	} else {
		fill(0);
		text("Getting Data");
	}
	
	if(songTitle) {
		textFont(font);
		text(songTitle, mouseX ,mouseY);
		textSize(fontSize);
		fill(fontColor);
	}
	
}

//$("#tintButton").click(function() {
//	showTint =! showTint {
//	 	tint(0, g, 204);  // Tint blue		
//	}
//});



// toggle the unlock on a mousePressed (or button click or whatever you want!)
function mousePressed() {
	// set unlocked equal to its opposite
	// aka, if its true, make it false and vice versa
	unlocked =! unlocked;
	//if (loaded) {
		//showTint = true;
	//}
}


$("#tintButton").click(function() {
		showTint = true;
		});




function loadTheImage(url) {
	console.log('loadingImage');
	theImage = loadImage(url, function() {
		loaded = true;
	});
}




