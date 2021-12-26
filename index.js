const app = require('./src/app');
require('dotenv').config();
const PORT = process.env.PORT;

app.listen(PORT || 3000, ()=>{
    console.log(`App is running on ${PORT}`);
});