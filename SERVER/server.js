
import express from 'express'; 
import partyRouter from './routes/parties';
import officeRouter from './routes/offices';

const app = express(); 
app.use(express.urlencoded({extended: false}));

app.use(express.json()); 

app.use(partyRouter);
app.use(officeRouter);

app.get('/', (req, res) =>{
    res.status(200).json({
        message: 'Welcome to Politico App'
    });
});

const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`App listening on port  ${port}`);
});

export default app;