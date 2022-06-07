const fs = require('fs');
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
client.setID(5);
client.connectRTUBuffered("COM6", { baudRate: 9600 });

const db = './log.json'
const interval = 0.05; //intervalo entre amostras (minutos)
// let paramsArray = ["rsa", "rsma", "h2oa", "h2oma", "tha"]
// let alarmsArray = ["rsa", "rsma", "h2oa", "h2oma", "trend", "selfdiag"]
// let measurementArray = ["rs", "rstr", "h2o", "temp", "trend", "temp2"]

setInterval(async function(){
    let indications = [];
    let params = [];

    params.push( await client.readHoldingRegisters(0,5) );  // params = [{data:[], buffer:<>}]
    params.forEach(resultParams => {                        // resultParams = {data:[], buffer:<>}
        fs.readFile(db, 'utf8', (err, currentJSON) => {
            let dbData = JSON.parse(currentJSON)
            dbData[0].parameters.rsa.push(resultParams.data[0])
            dbData[0].parameters.rsma.push(resultParams.data[1])
            dbData[0].parameters.h2oa.push(resultParams.data[2])
            dbData[0].parameters.h2oma.push(resultParams.data[3])
            dbData[0].parameters.tha.push(resultParams.data[4])
            fs.writeFile(db, JSON.stringify(dbData) , (err, data) => {})
        })
    })
    indications.push( await client.readHoldingRegisters(1000,10) );
    indications.forEach(resultIndications => {
        fs.readFile(db, 'utf8', (err, currentJSON) => {
            let dbData = JSON.parse(currentJSON)
            dbData[0].indications.measurements.rs.push(resultIndications.data[0])
            dbData[0].indications.measurements.rstr.push(resultIndications.data[1])
            dbData[0].indications.measurements.h2o.push(resultIndications.data[3])
            dbData[0].indications.measurements.temp.push(resultIndications.data[4])
            dbData[0].indications.measurements.trend.push(resultIndications.data[5])
            dbData[0].indications.measurements.temp2.push(resultIndications.data[6])

            // var alarms = resultIndications.data[10]
            // if(alarms == 0){
            //     dbData[0].indications.alarms.rsa.push(0)
            //     dbData[0].indications.alarms.rsma.push(0)
            //     dbData[0].indications.alarms.h2oa.push(0)
            //     dbData[0].indications.alarms.h2oma.push(0)
            //     dbData[0].indications.alarms.trend.push(0)
            //     dbData[0].indications.alarms.selfdiag.push(0)


            // } else if(){

            //}
            
            
            // dbData[0].indications.alarms.rsa.push()
            // dbData[0].indications.alarms.rsma.push()
            // dbData[0].indications.alarms.h2oa.push()
            // dbData[0].indications.alarms.h2oma.push()
            // dbData[0].indications.alarms.trend.push()
            // dbData[0].indications.alarms.selfdiag.push()
            fs.writeFile(db, JSON.stringify(dbData) , (err, data) => {})
        })
    })
    
    

},1000*60*interval)