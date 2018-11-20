function browser_name() 
{
	var ua = navigator.userAgent.toLowerCase();
	//alert(ua);

	if(ua.indexOf("android") > -1){
		return "android"
	} else
	// ќпределим Internet Explorer
	if (ua.indexOf("msie") != -1 && ua.indexOf("opera") == -1 && ua.indexOf("webtv") == -1)
	{
		return "msie"
	} else
	// Opera
	if (ua.indexOf("opera") != -1)
	{
		return "opera"
	} else
	// Gecko = Mozilla + Firefox + Netscape
	if (ua.indexOf("gecko") != -1) 
	{
		return "firefox";
	} else 
	// Safari, используетс€ в MAC OS
	if (ua.indexOf("safari") != -1) 
	{
		return "safari";
	} else
	// Konqueror, используетс€ в UNIX-системах
	if (ua.indexOf("konqueror") != -1) {
		return "konqueror";
	} else
	if (ua.indexOf("chrome") > -1) {
		return "chrome";
	} else
	return "unknown";
}

function android_version(){
	var ua = navigator.userAgent.toLowerCase();
	var str_ar = new Array();
	str_arr = ua.split(";");

	for(var i = 0; i < str_arr.length; i++){
		if(str_arr[i].indexOf("android") != -1){
			//alert(str_arr[i]+": version = "+str_arr[i].split(" ")[2]);
			return str_arr[i].split(" ")[2];
		}
	}
	return 0;
}

//websockets are native since android 4.4
function nativeSocksAvailable(){
	var av = android_version();
	//alert("av="+av+"; parseFloat="+parseFloat(av));

	return (parseFloat(av)>4.3)?(true):(false);
}
