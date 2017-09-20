var form;
var forminput

function validate() {
	form=document.forms['StartForm'];
	forminput=document.forms['StartForm']['myinput'];
	if (forminput.value==""||forminput.value==null){
		document.getElementById('errormsg').innerHTML="Please enter something";
		return false;
	}
	else{
				document.getElementById('errormsg').innerHTML="";

		pop("nextform");
	}
}

var name;
function checkSecond(){
	name=window.location.search.substr(1);
	 name=name.split("=")[1];
	var data='<input type="hidden" name="primary" value="'+name+'"></input>';
	
	document.getElementById("stuff").innerHTML="TITLE:"+name;
	document.getElementById("form").innerHTML=data+document.getElementById("form").innerHTML;
	
}
function show(x){
	document.getElementById("display").innerHTML="You entered '<em>"+name+"'</em> in last form<br/> and now you are entering : "+x.value;
}
