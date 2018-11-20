function setCookie( name, value, expires, path, domain, secure )
{
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60;// * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}

function getParam(sParamName){
    var Params = location.search.substring(1).split("&"); // отсекаем «?» и вносим переменные и их значения в массив
    var variable = "";
    for (var i = 0; i < Params.length; i++){ // пробегаем весь массив
        if (Params[i].split("=")[0] == sParamName){ // если это искомая переменная — бинго!
            if (Params[i].split("=").length > 1) variable = Params[i].split("=")[1]; // если значение параметра задано, то возвращаем его
            return variable;
        }
    }
    return "";
}

function getCookie(name) 
{
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) 
	{
		offset = cookie.indexOf(search);
		if (offset != -1) 
		{
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) 
			{
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
return(setStr);
}
