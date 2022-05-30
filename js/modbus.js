const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
// open connection to a serial port
client.setID(1);

client.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 9600 });

let arrayData = [];
setInterval(function(){
    client.readHoldingRegisters(5, 1, function(err, data){
        arrayData.push(data.data[0])
        console.log(arrayData);
    })

},2000)

//console.log(read.value)