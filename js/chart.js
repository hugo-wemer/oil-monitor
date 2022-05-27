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

    let dataLabels = labels(amostras.dia + 1)
    let dataSeries = series(amostras.dia)
    console.log(dataSeries)

    const data = {
        labels: dataLabels,
        datasets: [{
            label: 'Amostras MO',
            backgroundColor: 'rgb(0, 130, 66)',
            borderColor: 'rgb(0, 130, 66)',
            data: dataSeries,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    const myChart = new Chart(document.getElementById('myChart'), config)