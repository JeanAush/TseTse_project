const express = require('express');
const multer = require('multer'); // For handling file uploads
const csvParser = require('csv-parser'); // For parsing CSV files
const fs = require('fs'); // Include the fs module for working with the filesystem
const db = require('mysql2'); // Your database connection module
const jwt = require('jsonwebtoken'); 
const jwtSecret = 'your-secret-key'; // Replace with your actual secret key
const cors = require('cors'); // Import the cors module


const app = express();
const port = 5000;

// app.use = ((req, res, next) =>{
//   const token = req.header ('x-auth-token');

//   if(!token) {
//     return res.status(401).json({ error: 'No token, authorization denied' });
//   }

//   try{
//     const decoded = jwt.verify(token, jwtSecret);
//     req.user = decoded;
//     next();
//   }catch(error){
//     res.status(401).json({error: 'Token not found'});
//   }
// });

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


const connection = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  
  database: 'tsetse_project'
});
const data = {};
// Example implementation of db.saveUploadedFile
data.saveUploadedFile = async (filename, filePath, userId) => {
  const query = `INSERT INTO uploaded_files (filename, file_path, user_id) VALUES (?, ?, ?)`;
  const values = [filename, filePath, userId];
  const [results] = await connection.promise().query(query, values);
  return results.insertId; // Return the ID of the inserted row
};

// Example implementation of db.saveGeneticData
data.saveGeneticData = async (fileId, geneticData) => {
  const query = `INSERT INTO genetic_data (file_id, data) VALUES (?, ?)`;
  const values = [fileId, JSON.stringify(geneticData)];
  await connection.promise().query(query, values);
};
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Configure file upload using multer
const upload = multer({ dest: 'uploads/' });

// Endpoint for uploading CSV files
app.post('/upload', upload.single('file'), (req, res) => {
  const { file } = req;
  const filePath = file.path;

  const userId = req.user?.userId; // Get user ID from the decoded JWT token

  if (!userId) {
    return res.status(401).json({ error: 'User ID not found in JWT token' });
  }
  const geneticData = [];


  // Parse the CSV file using csv-parser
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      geneticData.push(row);
    })
    .on('end', async () => {
      // Save file details and genetic data to the database (you need to implement this)
      try {
        const fileId = await db.saveUploadedFile(file.originalname, filePath, userId);
        await db.saveGeneticData(fileId, geneticData);
        res.json({ fileId });
      } catch (error) {
        console.error('Error uploading and processing file:', error);
        res.status(500).json({ error: 'Error uploading and processing file' });
      }
    });
});
// Endpoint for user login and JWT generation
async function findUserByUsernameAndPassword(username) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Assuming there's only one user per username
          const user = results[0] || null;
          resolve(user);
        }
      }
    );
  });
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsernameAndPassword(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ userId: user.id }, jwtSecret);
    res.json({ accessToken });
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});