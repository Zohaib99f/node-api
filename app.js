const express = require('express');
const mysql= require('mysql2');
const app = express ();
app.use(express.json());
////////////////////////////////////Database COnnection//////////////////////////////

const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'nodejs_rest_api',
 });
 
 db.connect((err) => {
   if (err) {
     console.error('Error connecting to MySQL:', err);
     return;
   }
   console.log('Connected to MySQL database');
 });




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (request, response) => {
   const status = {
      "Status": "Running"
   };
   
   response.send(status);
});
///////////////////////////////////////Getting all users from database ///////////////////////////// 
app.get("/get_all_users", (request,response) => {

   
      db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        response.json(results);
      });
    


});

//////////////////////////////////////Inserting users in database/////////////////////////

app.post("/insertusers", (req,response) => {
   const { name, email } = req.body;

  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
if(err) throw err;
response.json({ message: 'User added successfully', id: result.insertId });

}); 
//console.log(req);
//response.json(req.body.name);


});



