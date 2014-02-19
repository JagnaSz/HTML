window.onload = function(){
	
	for(var i=0; i< document.styleSheets.length; i++){
		
		document.getElementsByClassName("menu")[0].innerHTML += '<li onclick=\"zmiana(\''+document.styleSheets[i].href +'\')\">'+ document.styleSheets[i].title + '</li>';
	
	}
	console.log(getCookie());
	zmiana(getCookie());
};

function zmiana(arg){
	if(arg != undefined){
		var ns = arg.split('/');
		var meet = ns[ns.length-1];
		
	}
		if(meet === "index.css"){
			setCookie(arg);
			document.styleSheets[0].disabled = false;
			document.styleSheets[1].disabled = true;
			document.styleSheets[2].disabled = true;
		}		
		else if(meet === "alt-style.css"){
			setCookie(arg);
			document.styleSheets[0].disabled = true;
			document.styleSheets[1].disabled = false;
			document.styleSheets[2].disabled = true;
		}
				
		else if(meet === 'style-print.css'){
			setCookie(arg);
			document.styleSheets[0].disabled = true;
			document.styleSheets[1].disabled = true;
			document.styleSheets[2].disabled = false;
		}
	else{
			document.styleSheets[0].disabled = false;
			document.styleSheets[1].disabled = true;
			document.styleSheets[2].disabled = true;

	}

	}

	function setCookie(cvalue)
	{
		var exdays = 10;
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	
	console.log(cvalue);
	document.cookie ="ciastko="+cvalue + "; " + expires;
	}

	function getCookie()
	{
	var ca = document.cookie.split(';');
	
	console.log(ca[0]);
	if (ca[0])
		return ca[0];
	}