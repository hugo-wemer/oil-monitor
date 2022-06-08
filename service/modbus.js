const fs = require('fs');
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
client.setID(5);
client.connectRTUBuffered("/dev/ttyUSB1", { baudRate: 9600 });

const db = './log.json'
const interval = 0.05; //intervalo entre amostras (minutos)


setInterval(async function(){
    let indications = [];
    let params = [];

    params.push( await client.readHoldingRegisters(0,5) );  // params = [{data:[], buffer:<>}]
    params.forEach(resultParams => {                        // resultParams = {data:[], buffer:<>}
        fs.readFile(db, 'utf8', (err, currentJSON) => {
            let dbData = JSON.parse(currentJSON)
            dbData[0].parameters.rsa.splice(0, 1)
            dbData[0].parameters.rsa.push(resultParams.data[0])
            dbData[0].parameters.rsma.splice(0, 1)
            dbData[0].parameters.rsma.push(resultParams.data[1])
            dbData[0].parameters.h2oa.splice(0, 1)
            dbData[0].parameters.h2oa.push(resultParams.data[2])
            dbData[0].parameters.h2oma.splice(0, 1)
            dbData[0].parameters.h2oma.push(resultParams.data[3])
            dbData[0].parameters.tha.splice(0, 1)
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

            if (resultIndications.data[7] >= 4){    // maior ou igual a quatro pois é o valor que representa o relé de autodiag (0000100 = 4)
                dbData[0].indications.alarms.selfdiag.splice(0, 1)
                dbData[0].indications.alarms.selfdiag.push(1)
            }



            let alarms = resultIndications.data[8]
            alarms = alarms.toString(2)
            alarms = alarms.split('')
            let alarmItems = ["rsa", "rsma", "h2oa", "h2oma", "trend"]
            let i = alarms.length;
            alarmItems.forEach(item => {
                console.log(dbData[0].indications.alarms.item)  // A vida seria tão mais fácil se esse item funcionasse assim...
                // if(alarms[i] == true){
                //     dbData[0].indications.alarms.item.splice(0, 1);
                //     dbData[0].indications.alarms.item.push(1);
                // }else{
                //     dbData[0].indications.alarms.item.splice(0, 1)
                //     dbData[0].indications.alarms.item.push(0)
                // }
                i--
            })

            fs.writeFile(db, JSON.stringify(dbData) , (err, data) => {})
        })
    })
    
    

},1000*60*interval)