const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
client.setID(2);
client.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 9600 });

setTimeout(async function(){

    let indications = [];
    let params = [];

    params.push( await client.readHoldingRegisters(0,5) );
    params.forEach(result => {
        console.log(result.data)
    }) 
    indications.push( await client.readHoldingRegisters(1000,10) );
    indications.forEach(result => {
       console.log(result.data)
    })

},2000)

