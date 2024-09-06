-- Création de la base de données
CREATE DATABASE db_your_car_your_way;
USE db_your_car_your_way;

-- Table des utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    birth_date DATE,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des agences de location
CREATE TABLE agencies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    agency_name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    phone_number VARCHAR(20)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des catégories de véhicules
CREATE TABLE vehicle_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    acriss_code VARCHAR(4) NOT NULL,
    description VARCHAR(255) NOT NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des véhicules
CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES vehicle_categories(id),
    brand VARCHAR(50),
    model VARCHAR(50),
    registration_number VARCHAR(20) UNIQUE NOT NULL,
    availability BOOLEAN DEFAULT TRUE
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des locations
CREATE TABLE rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    vehicle_id INT,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    departure_agency_id INT,
    FOREIGN KEY (departure_agency_id) REFERENCES agencies(id),
    return_agency_id INT,
    FOREIGN KEY (return_agency_id) REFERENCES agencies(id),
    departure_date DATETIME NOT NULL,
    return_date DATETIME NOT NULL,
    rate DECIMAL(10, 2) NOT NULL,
    status ENUM('Reserved', 'In Progress', 'Completed', 'Cancelled') DEFAULT 'Reserved'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des paiements
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rental_id INT,
    FOREIGN KEY (rental_id) REFERENCES rentals(id),
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Successful', 'Failed', 'Pending') DEFAULT 'Pending',
    transaction_id VARCHAR(255) UNIQUE
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table du service client
CREATE TABLE customer_service (
id INT AUTO_INCREMENT PRIMARY KEY,
agency_id INT,
FOREIGN KEY (agency_id) REFERENCES agencies(id),
user_id INT, FOREIGN KEY (user_id) REFERENCES users(id),
inquiry TEXT NOT NULL,
inquiry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
status ENUM('Open', 'In Progress', 'Closed') DEFAULT 'Open'
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table des conversations pour inclure la session de chat
CREATE TABLE conversations (
id INT AUTO_INCREMENT PRIMARY KEY,
chat_session_id INT,
FOREIGN KEY (chat_session_id) REFERENCES chat_sessions(id),
message TEXT NOT NULL,
sender ENUM('User', 'Agent') NOT NULL,
sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
read_at TIMESTAMP NULL );

-- Table des sessions de chat
CREATE TABLE chat_sessions (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
agency_id INT,
FOREIGN KEY (agency_id) REFERENCES agencies(id),
started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ended_at TIMESTAMP NULL );