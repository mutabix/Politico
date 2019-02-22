
import express from 'express'; 
import partyRouter from './routes/api/v1/parties';
import officeRouter from './routes/api/v1/offices';
import userRouter from './routes/auth/userRoutes';

const app = express(); 
app.use(express.urlencoded({extended: false}));

app.use(express.json()); 

// app.use(partyRouter);
app.use(officeRouter);
// app.use(userRouter);


app.get('/', (req, res) =>{
    res.status(200).json({
        message: 'Welcome to Politico App'
    });
});

app.use('*', (req, res) =>{
    res.status(404).send({
        status: 404,
        message: 'Wrong Url or HTTP Request!'
    });
});


const port = process.env.PORT || 3000; 
app.listen(port);

export default app;