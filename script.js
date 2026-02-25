async function loadData(){
    const response = await fetch("data.json");
    const data = await response.json();

    document.getElementById("temp").innerText = data.temperature + "°C";
    document.getElementById("humidity").innerText = data.humidity + " %";
    document.getElementById("wind").innerText = data.wind + " m/s";
    document.getElementById("pressure").innerText = data.pressure + " hPa";
    document.getElementById("air").innerText = data.airQuality;

    let icon = "☀️";
    let condition = "Ensolarado";

    if(data.humidity > 80 && data.pressure < 1005){
        icon = "🌧️";
        condition = "Possível Chuva";
    }
    else if(data.light < 1000){
        icon = "☁️";
        condition = "Nublado";
    }

    document.getElementById("icon").innerText = icon;
    document.getElementById("condition").innerText = condition;

    let drive = "Boa";
    if(data.wind > 12){
        drive = "Perigosa";
    }
    document.getElementById("driveStatus").innerText = drive;

    let run = "Ideal";
    if(data.temperature > 35){
        run = "Desaconselhável";
    }
    document.getElementById("runStatus").innerText = run;

    createChart(data.history);
}

function createChart(history){
    const ctx = document.getElementById("tempChart").getContext("2d");

    new Chart(ctx,{
        type:"line",
        data:{
            labels: history.map((_,i)=> i+1),
            datasets:[{
                label:"Temperatura",
                data: history,
                borderWidth:2
            }]
        },
        options:{
            responsive:true
        }
    });
}

loadData();
setInterval(loadData,5000);
