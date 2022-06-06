 const ModbusRTU = require("modbus-serial");
 const client = new ModbusRTU();
 client.setID(2);
 client.connectRTUBuffered("COM6", { baudRate: 9600 });
 //client.open();
 let arrayData = [];
 let array2Data = [];
 setTimeout(function(){
                client.readHoldingRegisters(5, 1, function(err, data){
                arrayData.push(data.data[0])
                console.log(arrayData);
                })

            }, 2000)

//setTimeout(function(){
//    client.close();
//},3000)

//client.open();
 setTimeout(function(){
                client.readHoldingRegisters(1000, 1, function(err, data){
                array2Data.push(data.data[0])
                console.log(array2Data);
                })

            }, 2000)
            
// setTimeout(function(){
//     client.close();
// },3000)