const amostras ={ dia: 96,semana:150, mes: 2688};


function getRandom() {
    return Math.floor(Math.random() * (30 - 0 + 1) + 0);
}
function labels(period) {
    let labelArray = [];
    for (let i = 0; i < period; i++) {
        labelArray.push(i);
    }

    return labelArray;
}

function series(period) {
    let seriesArray = [];
    for (let i = 0; i <= period; i++) {
        seriesArray.push(getRandom());
    }
    return seriesArray;
}

function constant(period){
    let constantArray = [];
    for (let i = 0; i < period; i++){
        constantArray.push(35);
    }
    return constantArray;
}

    let dataLabels = labels(amostras.dia + 1)
    let dataSeries = series(amostras.dia)
    let xxx = constant(amostras.dia)
    console.log(dataSeries)

    const data = {
        labels: dataLabels,
        datasets: [{
            label: 'Amostras MO',
            backgroundColor: ['rgb(0, 130, 66)'],
            borderColor: 'rgb(0, 130, 66)',
            data: dataSeries,
            pointRadius: 1.3,
            borderWidth: 1.5,
        },
        {
            label: 'Alarme',
            backgroundColor: ['rgb(255, 0, 0)'],
            borderColor: 'rgb(255, 0, 0)',
            data: xxx,
            pointRadius: 0,
            borderWidth: 1.5,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {scales:{
            y:{
                min: -20,
                max: 100
            }

        },
        
        }
    };

    const myChart = new Chart(document.getElementById('myChart'), config)