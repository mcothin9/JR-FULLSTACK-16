const mongoose = require('mongoose');

function connectToDB() {
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
        logger.error('connection string not defined');
        // 正常退出
        // 非正常退出
        // 人为正常退出 process.exit(0)
        // 人为非正常退出
        process.exit(1);
    }

    const db = monggose.connection;
    db.on('connected', () => {
        logger.info(`DB connected, ${connectionString}`);
    });

    db.on('error', (error) => {
        logger.error(error.message);
        process.exit(2);
    });

    db.on('disconnected', () => {
        logger.info('DB connection lost');
    });
    
    return mongoose.connect(connectionString);
}

module.exports = connectToDB;