// See http://www.cookiecentral.com/faq/#3.5
chrome.tabs.getSelected(null, function(tab) {
  domain = getDomain(tab.url)  
  //console.log("domain=["+domain+"]")
  chrome.cookies.getAll({}, function(cookies) {
    document.write("<pre>\n");    
    document.write("# Cookies for domains related to <b>" + escapeForPre(domain) + "</b>.\n");
    document.write("# This content may be pasted into a cookies.txt file and used by wget\n");
    document.write("# Example:  wget -x <b>--load-cookies cookies.txt</b> " + tab.url + "\n"); 
    document.write("#\n");
    for (var i in cookies) {
      cookie = cookies[i]; 
      if (cookie.domain.indexOf(domain) != -1) {     
      document.write(escapeForPre(cookie.domain));
      document.write("\t");
      document.write(escapeForPre((!cookie.hostOnly).toString().toUpperCase()));
      document.write("\t");     
      document.write(escapeForPre(cookie.path)); 
      document.write("\t");     
      document.write(escapeForPre(cookie.secure.toString().toUpperCase()));
      document.write("\t");     
      document.write(escapeForPre(cookie.expirationDate ? cookie.expirationDate : "0"));
      document.write("\t");     
      document.write(escapeForPre(cookie.name));
      document.write("\t");     
      document.write(escapeForPre(cookie.value));
      document.write("\n");                      
      }
    }
    document.write("</pre>");
  });      
})

function escapeForPre(text)
{
  return String(text).replace(/&/g, "&amp;")
                     .replace(/</g, "&lt;")
                     .replace(/>/g, "&gt;")
                     .replace(/"/g, "&quot;")
                     .replace(/'/g, "&#039;");
}

function getDomain(url)
{
  //console.log("url=["+url+"]")
  server = url.match(/:\/\/(.[^/:#?]+)/)[1];
  //console.log("server=["+server+"]")
  parts = server.split(".");
  //console.log("parts=["+parts+"]")

  isip = !isNaN(parseInt(server.replace(".",""),10))
  //console.log("parts=["+isip+"]")

  if (parts.length == 1 || isip)
  {
    domain = server
  }
  else
  {
  	domain = parts[parts.length - 2] + "." + parts[parts.length -1];	
  }
  
  return domain;
}