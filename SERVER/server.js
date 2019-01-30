
import express from 'express'; 
import partyRouter from './routes/parties';
import officeRouter from './routes/offices';

const app = express(); 
app.use(express.urlencoded({extended: false}));

app.use(express.json()); 

// Routes
app.use(partyRouter);
app.use(officeRouter);

app.get('/', (req, res) =>{
    res.status(200).json({
        message: 'Welcome to Politico App'
    });
});

const port = app.listen(process.env.PORT || 3000, () =>{
 console.log('App listening on port 3000 ' );
});

export default app;