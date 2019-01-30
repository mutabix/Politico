
import express from 'express'; 
import partyRouter from './routes/parties';

const app = express(); 
app.use(express.urlencoded({extended: false}));

app.use(express.json()); 
app.use(partyRouter);

app.get('/', (req, res) =>{
    res.status(200).json({
        message: 'Welcome to Politico'
    });
});

const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`App listening on port  ${port}`);
});

export default app;