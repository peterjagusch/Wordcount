$( document ).ready(function() {
	var textArray = [];
	
	var countWords = {
	
	textToArray : function(){
		//Add variables to use later
        var largestCount = 0;
        var totalWordCount = 0;
        var punct = "(-_‘[]{}“£$&%!:;\/)";
		var textList = $("#txtArea").val();
		var textArray = new Array();
        var commaCount = (textList.match(/,/g) || []).length;
        var dotCount = (textList.match(/\./g) || []).length;
		$.each(textList.split(" "), function (i, word) {
				//If beginds with punctuation then remove it
				if (punct.indexOf(word[0]) > -1) {
					word = word.substring(1);
				}
				//If ends with punctuation then remove it
				if (punct.indexOf(word[word.length - 1]) > -1) {
					word = word.substring(0, (word.length - 1));
				}
				// empty string check
				if(word != ""){
					//remove comma and dot.
					var cleanWord = word.replace(/[, .]+/g, "").trim();
					textArray.push(cleanWord);
				}
			});
			
			//Lower case and sort array items
			textArray = textArray.map(function (i) { return i.toLowerCase() });
			textArray.sort();


			//Remove Duplicates & clean up
			var cleanArray = [];
			textArray.forEach(function(x) {
				if (cleanArray.length==0 || cleanArray.slice(-1)[0]!==x){
					cleanArray.push(x)
				}
			})
			totalWordCount = cleanArray.length;
			//Send to show commas and dots
			countWords.CreateCountResults(totalWordCount, dotCount, commaCount);
			
			//Check for numbers
			 if (!textList.split("").every(function (i) { return isNaN(parseFloat(i))})) {
				var err = "Please do not enter numbers.";
				$("#error_msg").text(err) 
				$("#error_msg").show();
			}
			//Check word count is correct , between 5 and 500 words
			else if (textArray.length < 5 || textArray.length > 500) {
				var err = "Please enter between 5 and 500 words.";
				$("#error_msg").text(err) 
				$("#error_msg").show();
			}
			else {
				//If ok, Send to Creat table
				countWords.CreateTableFunction(cleanArray);
				$("#error_msg").hide();
			}
		},



	CreateCountResults: function (totalWordCount, dotCount, commaCount) {
        //Get container
		$("#punc_results").empty();
        var PuncCont = $("#punc_results");
        PuncCont.innerHTML = "";

        //add element with Word count
        var pTag = document.createElement('p');
        pTag.innerHTML = "Words = " + totalWordCount;
        PuncCont.append(pTag);

        //add element with , count
        var pTag = document.createElement('p');
        pTag.innerHTML = ", = " + commaCount;
        PuncCont.append(pTag);

        //add element with . count
        var pTag = document.createElement('p');
        pTag.innerHTML = ". = " + dotCount;
        PuncCont.append(pTag);
        PuncCont.show();

		},
	
	CreateTableFunction: function (cleanArray) {
		var LargestGroup = 0;
		//Create Table and set up usable variables
        var createTable = document.createElement('table');
		var tr = document.createElement('tr');
		var length = cleanArray.length;		
		var groups = {};
		var groupCount = 0;
		
		//Group by First Character
		for (var i = 0; i < length; i ++ ){
			var groupCount = 0;
			var item      = cleanArray[ i ];
			var firstChar = item.charAt( 0 );
			groups[ firstChar ] = groups[ firstChar ] || [];
			groups[ firstChar ].push( item );
		}
		
		//Add table Header
			for(x = 0; x < Object.keys(groups).length; x++){
				th = document.createElement('th');
				th.innerHTML = Object.keys(groups)[x].toUpperCase();
				tr.appendChild(th);
			}
		
		 createTable.appendChild(tr);
		 tr = document.createElement('tr');
		
		//Find object with most words
		for (var index in groups) {
			if(groups[index].length > LargestGroup){
				LargestGroup = groups[index].length;
			}
		}
			for(var L = 0; L < LargestGroup+1; L++){
			//Create rows with cells , size largest group
			createTable.appendChild(tr);
				tr = document.createElement('tr');
				//Add in cells and content, if array is less than largest, add empty cell and nobreak space
				for (var index in groups) {
					td = document.createElement('td');
					if(!groups[index][L]){
						td.innerHTML = "&nbsp;";				
					}else{
						td.innerHTML = "<span class='" + groups[index][L] + "'>" + groups[index][L] +"<span>";
					}
                tr.appendChild(td);
			}
		}
		// Empty result div and add table
		$("#result_table").empty();
        $("#result_table").append(createTable);
	
		}
    };
	
	// Add click to button
	var ActionBtn = $("ResultBtn");
    $('#ResultBtn').bind('click', countWords.textToArray);

});


