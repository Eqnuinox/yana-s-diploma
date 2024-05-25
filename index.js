import 'dotenv/config.js';
import sequelize from './db.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './logger.js';
import * as models from './models/models.js';
import router from './routers/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1', router);

app.use(errorMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () =>
            logger.trace(`Server started on Port = ${PORT}`)
        );
    } catch (error) {
        logger.error(error);
    }
};

start();
