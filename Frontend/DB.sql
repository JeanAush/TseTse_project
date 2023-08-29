-- Users table
CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);

-- UploadedFiles table
CREATE TABLE UploadedFiles (
  file_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  file_name VARCHAR(255) NOT NULL,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- GeneticData table
CREATE TABLE GeneticData (
  data_id INT PRIMARY KEY AUTO_INCREMENT,
  file_id INT,
  species_identifier VARCHAR(100) NOT NULL,
  genetic_marker_1 VARCHAR(255) NOT NULL,
  genetic_marker_2 VARCHAR(255) NOT NULL,
  -- ... (add more genetic markers as needed)
  FOREIGN KEY (file_id) REFERENCES UploadedFiles(file_id)
);

-- ClassificationResults table
CREATE TABLE ClassificationResults (
  result_id INT PRIMARY KEY AUTO_INCREMENT,
  data_id INT,
  predicted_species VARCHAR(100) NOT NULL,
  FOREIGN KEY (data_id) REFERENCES GeneticData(data_id)
);
