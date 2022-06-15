 function labels() {
    let labelArray = []
    for (let i = 0; i < 34; i++) {
      labelArray.push(i)
    }
  
    return labelArray
  }
  
  let dataLabels = labels()
  
  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: 'Relative saturation',
        backgroundColor: ['rgb(3, 219, 252)'],
        borderColor: 'rgb(3, 219, 252)',
        data: "",
        pointRadius: 0,
        borderWidth: 1.5,
        fill: false,
      },
      {
        label: 'Relative saturation at reference temperature',
        backgroundColor: ['rgb(230, 124, 25)'],
        borderColor: 'rgb(230, 124, 25)',
        data: "",
        pointRadius: 0,
        borderWidth: 1.5,
        fill: false,
      },
      {
        label: 'H2O',
        backgroundColor: ['rgb(0, 0, 255)'],
        borderColor: 'rgb(0, 0, 255)',
        data: "",
        pointRadius: 0,
        borderWidth: 1.5,
        fill: false,
      },
      {
        label: 'Temperature',
        backgroundColor: ['rgb(255, 0, 255)'],
        borderColor: 'rgb(255, 0, 255)',
        data: "",
        pointRadius: 0,
        borderWidth: 1.5,
        fill: false,
      },
    ],
  }
  
  const config = {
    height: 5,
    type: 'line',
    data: data,
    options: {
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'nearest',
      },
      animations: {
        tension: {
          easing: 'linear',
          from: 1,
          to: 0.15,
        },
      },
      scales: {
        y: {
          min: 0,
          max: 1500,
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        title: {
            display: true,
            text: 'Amostragem - MO'
        }
    }
    },
  }
  


function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

ajax_get('./service/log.json', function(log) {

    data.datasets[0].data = log[0].indications.measurements.rs;
    data.datasets[1].data = log[0].indications.measurements.rstr;
    data.datasets[2].data = log[0].indications.measurements.h2o;
    data.datasets[3].data = log[0].indications.measurements.temp;
    
    console.log(log[0].indications.measurements.rstr);
    const chart = new Chart(document.getElementById('myChart'), config)
});