/*
YO DEVELOPER COMMUNITY
---R10 JOBS----
--- version 1.0---
created by kelesOglu

*/

	var sayac=0;
	

	var req_ron=setInterval(function(){	
	var response=reqAjax();

	if(!(response===null)){
		notify(sayac,response);	
	sayac++;
   
}
	if(sayac==(response.length)){
		sayac=0;
		stop();
	}

},1200000);

	function notify(i,response){
		
			  if(Notification.permission!=="granted"){
			  	Notification.requestPermission();
			  }else{
			  	var data={
			  		"time":$(response[i]).find("td[id^=td_threadtitle] > div[class='smallfont']").text(),
			  		"job":$(response[i]).find("a[id^=thread_title]").text()+"\n"+$(response[i]).find("span[class='time']").text(),
			  		"link":$(response[i]).find("a[id^=thread_title]").attr("href"),
			  		"icon":'yo.png'
			  	};
			   
			    var notification = new Notification(data.time,  {
			      icon: data.icon,
			      body: data.job,
			    });
			 
			    notification.onclick = function () {
			      window.open(data.link);      
			    }
			}
	}

	function reqAjax(){
		
	var response;

					$.ajax({
							url:"http://www.r10.net/is-verenler/",
							type:"GET",
							dataType:"html",
							async:false,//avoid running as async

							success:function (argument) {
								
									var pattern=/bugün/gi;
									
									if(pattern.test(argument)){
										
											response=$($(argument).find("td:contains('Bugün')").parent());
										
					
										
									}
					
							}});
					return response;
	}
function stop(){
	clearInterval(req_ron);
}