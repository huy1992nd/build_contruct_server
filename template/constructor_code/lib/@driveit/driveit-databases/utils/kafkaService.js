async function sendDataToKafka(ip, port, topic, dataPayload, callbackSuccess, callbackError) {
    if (ip === undefined || ip === null || ip === '' || typeof(ip) === 'function') {
        console.log(`missing ip`);
        return;
    }

    if (port === undefined || port === null || port === '' || typeof(port) === 'function') {
        console.log(`missing port`);
        return;
    }

    if (topic === undefined || topic === null || topic === '' || typeof(topic) === 'function') {
        console.log(`missing topic`);
        return;
    }

    if (dataPayload === undefined || dataPayload === null || dataPayload === '' || typeof(dataPayload) === 'function') {
        console.log(`missing dataPayload`);
        return;
    }

    const { Kafka } = require('kafkajs');
    const kafka = new Kafka({
        // clientId: 'my-app',
        brokers: [
            `${ip}:${port}`
        ]
    });

    const producer = kafka.producer();

    console.log(`ip: ${ip} -- port: ${port} -- topic: ${topic}`);

    return producer.connect().then(() => {
        //connected sending
        const kafkaPayload = {
            topic: topic,
            messages: [{
                value: JSON.stringify(dataPayload)
            }],
        }

        console.log("data sending to kafkaPayload: ", kafkaPayload);

        return producer.send(kafkaPayload).then((kafkaResult) => {
            console.log("kafkaResult: ", kafkaResult);
            callbackSuccess(kafkaResult);
            return producer;
        })
    }).then(() => {
        producer.disconnect();
    }).catch((err) => {
        producer.disconnect();
        console.error("Kafka Error: ", err);
        callbackError(err);
    });
}

module.exports = {
    sendDataToKafka,
};

// This is for test
// const testData = {
//     seqNo: 1,
//     documentType: 'LPO'
// }

// sendDataToKafka('202.188.134.61', '9092', Testing', testData, function(kafkaResult) {
//     console.log(kafkaResult)
// }, function(error) {
//     console.log(error)
// });