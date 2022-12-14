// import
import express from 'express';
import dotenv from 'dotenv';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import db from './models/index.js';
import user from './routes/user/user.js';
import emPost from './routes/employment/post.js';
import emPosts from './routes/employment/posts.js';
import emApplys from './routes/employment/apply.js';
import company from './routes/company/company.js';

// config
const app = express();
dotenv.config();

// sequelize
db.sequelize
    .sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

// middleware
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(
        helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            crossOriginResourcePolicy: false,
        }),
    );
    app.use(
        cors({
            origin: 'http://myblog.com',
            credentials: true,
        }),
    );
} else {
    app.use(morgan('dev'));
    app.use(
        cors({
            origin: true,
            credentials: true,
        }),
    );
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use('/user', user);
app.use('/empost', emPost);
app.use('/emposts', emPosts);
app.use('/emapply', emApplys);
app.use('/company', company);

//express
app.set('port', 9000);
app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번으로 서버 실행 중`, process.env.NODE_ENV);
});
