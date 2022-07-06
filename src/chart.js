const { fstat } = require('fs')
const path = require('path')
const fs = require('fs')

function labels() {
  let labelArray = []
  for (let i = 0; i < 50; i++) {
    labelArray.push(i)
  }

  return labelArray
}
let dataLabels = labels()

let data = {
  labels: dataLabels,
  datasets: [
    {
      label: 'Relative saturation',
      backgroundColor: ['rgb(3, 219, 252)'],
      borderColor: 'rgb(3, 219, 252)',
      data: '',
      pointRadius: 0,
      borderWidth: 1.5,
      fill: false,
    },
    {
      label: 'Relative saturation at reference temperature',
      backgroundColor: ['rgb(230, 124, 25)'],
      borderColor: 'rgb(230, 124, 25)',
      data: '',
      pointRadius: 0,
      borderWidth: 1.5,
      fill: false,
    },
    {
      label: 'H2O',
      backgroundColor: ['rgb(0, 0, 255)'],
      borderColor: 'rgb(0, 0, 255)',
      data: '',
      pointRadius: 0,
      borderWidth: 1.5,
      fill: false,
    },
    {
      label: 'Temperature',
      backgroundColor: ['rgb(255, 0, 255)'],
      borderColor: 'rgb(255, 0, 255)',
      data: '',
      pointRadius: 0,
      borderWidth: 1.5,
      fill: false,
    },
  ],
}

let config = {
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
        max: 100,
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
        text: 'Amostragem - MO',
      },
    },
  },
}

let log = []

fs.readFile(path.join(__dirname, 'log.json'), 'utf8', (err, currentJSON) => {
  let parsedJSON = JSON.parse(currentJSON)

  parsedJSON[0].indications.measurements.rs.forEach(function (data) {
    log.push(data)
  })
})

data.datasets[0].data = log
let chart = new Chart(document.getElementById('myChart'), config)

ipcRenderer.on('cpu', (event, value) => {
  data.datasets[0].data.push(value)
  chart.destroy()
  chart = new Chart(document.getElementById('myChart'), config)
  console.log(config)
})
