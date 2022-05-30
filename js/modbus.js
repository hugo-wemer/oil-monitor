var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

client.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 9600, parity: 'none' });


client.setID(2);

function read(){
  client.readHoldingRegisters(0, 1)
    .then(console.log);
}
