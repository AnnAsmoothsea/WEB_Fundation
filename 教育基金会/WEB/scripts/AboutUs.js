function show(d1){
	var Nowcontent;
    if(Number(d1))  {
         Nowcontent=d1;
     }
     else
     {
         Nowcontent=1;
     }
     
    for(var i=1;i<=2;i++){
       if(i==Nowcontent)  
       {
            document.getElementById("content"+Nowcontent).style.display ="block";   //当前层
            document.getElementById("list"+Nowcontent).style.color="#E44C4C";
            document.getElementById("inputLink").value=document.getElementById("list"+Nowcontent).innerText;
        }
        else
        {
            document.getElementById("content"+i).style.display ="none";    //隐藏其他层
            document.getElementById("list"+i).style.color="#636363";
        }    
    }
}