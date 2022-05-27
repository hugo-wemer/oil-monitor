//let arraySize = [96, 672, 2688];
let arraySize = [96, 150, 2688];

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

  console.log(arraySize[0]);

  return seriesArray;
};





const range = document.querySelector("input");
range.addEventListener("change", () => {
  //console.log(range.value)

  var data = {
    labels: labels(range.value),
    series: [series(range.value)]

  }

  var options = {
    width: 1500,
    height: 500,
    axisX: {
      // We can disable the grid for this axis
      showGrid: false,
    },
  };

  new Chartist.Line('.ct-chart', data, options)
})
console.log(arraySize[0]);