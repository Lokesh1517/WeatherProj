const http = require('http');
const fs = require('fs');
const requests = require('requests');

const mainfile = fs.readFileSync("index.html","utf-8");
//api.openweathermap.org/data/2.5/weather?q=jaipur&appid=4f42ef4bd780975482faa4187f75b8b2
const server = http.createServer((req,res)=>{
    if(req.url=="/"){
        requests("http://api.openweathermap.org/data/2.5/weather?q=kanpur&appid=4f42ef4bd780975482faa4187f75b8b2")
       
        .on("data",(chunk) => {
            const object = JSON.parse(chunk);
            const arrData = [object];  
           // console.log((arrData[0].main.temp - 273.15).toFixed(1) + "°C");
           console.log(arrData[0].name)
            //console.log(chunk);
           myweatherstate = '<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp" width="150px"></img>';


           let realtime = mainfile.replace(
           "{%temperature%}",((arrData[0].main.temp - 273.15).toFixed(1) + "°C")).replace("{%city%}",arrData[0].name)
           .replace("{%weathericon%}",myweatherstate)
           

           res.write(realtime,"utf-8")
         //console.log(realtime);
           res.end()

           
        })
        .on("end",function(err){
           // if(err) throw err;
            console.log("ended successfully")
        })
    }
})
server.listen(3000,()=>{
    console.log("Server running at port 3000");
});