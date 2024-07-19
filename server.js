const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('dotenv').config();
const pool = require('./config/database.js');

// Inisialisasi aplikasi Express
const app = express();
const port = 3000;

// Middleware untuk mengurai JSON
app.use(bodyParser.json());

app.use(cors({
    origin: '*', // Izinkan semua domain (untuk pengujian, bisa diperketat nanti)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


// Middleware untuk mengurai form data
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi penyimpanan untuk file lampiran
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

// Registrasi
app.post('/register', (req, res) => {
    console.log('Request body:', req.body);
    const { username, email, password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        const hashedPassword = hashPassword(password);

        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const params = [username, email, hashedPassword];

        pool.query(sql, params, (error) => {
            if (error) {
                console.error('Error inserting user:', error);
                return res.status(500).json({ error: 'Failed to register user' });
            }

            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ error: 'Failed to hash password' });
    }
});



// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    const params = [email];

    pool.query(sql, params, (error, results) => {
        if (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ error: 'Failed to fetch user' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to compare passwords' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Simpan informasi pengguna ke dalam response
            res.status(200).json({
                message: 'Login successful',
                userId: user.id_users,
                username: user.username // Kirim nama pengguna
            });
        });
    });
});

// Buat tabel pengaduan jika belum ada
function createTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS pengaduan (
            id INT AUTO_INCREMENT PRIMARY KEY,
            judul_laporan VARCHAR(255) NOT NULL,
            nama_pelapor VARCHAR(255) NOT NULL,
            jenis_laporan VARCHAR(255) NOT NULL,
            tanggal_kejadian DATE NOT NULL,
            waktu_kejadian TIME NOT NULL,
            lokasi_kejadian VARCHAR(255) NOT NULL,
            deskripsi_kejaian TEXT NOT NULL,
            informasi_terlapor TEXT NOT NULL,
            lampiran VARCHAR(255),
            id_users INT,
            FOREIGN KEY (id_users) REFERENCES users(id_users)
        )
    `;

    pool.query(createTableQuery, (error) => {
        if (error) {
            console.error('Error creating table:', error);
        } else {
            console.log('Tabel pengaduan telah dibuat atau sudah ada.');
        }
    });
}

createTable();

// Endpoint untuk menerima pengaduan
app.post('/pengaduan', upload.single('lampiran'), (req, res) => {
    const pengaduanData = req.body;
    const userId = req.headers['user-id']; // Mengambil ID pengguna dari header atau parameter lainnya

    let lampiranFilename = null;
    if (req.file) {
        lampiranFilename = req.file.filename;
    }

    const sql = `
        INSERT INTO pengaduan (
            judul_laporan, nama_pelapor, jenis_laporan, tanggal_kejadian, waktu_kejadian, 
            lokasi_kejadian, deskripsi_kejaian, informasi_terlapor, lampiran, id_users
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        pengaduanData['judul-laporan'],
        pengaduanData['nama-pelapor'],
        pengaduanData['jenis-laporan'],
        pengaduanData['tanggal-kejadian'],
        pengaduanData['waktu-kejadian'],
        pengaduanData['lokasi-kejadian'],
        pengaduanData['deskripsi-kejadian'],
        pengaduanData['informasi-terlapor'],
        lampiranFilename,
        userId // Menyimpan ID pengguna yang membuat pengaduan
    ];

    pool.query(sql, params, (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json({ message: 'Pengaduan berhasil diterima', id: results.insertId });
        }
    });
});

// Endpoint untuk mendapatkan detail pengaduan berdasarkan ID
app.get('/pengaduan/:id', (req, res) => {
    const pengaduanId = req.params.id;
    const sql = 'SELECT * FROM pengaduan WHERE id = ?';
    pool.query(sql, [pengaduanId], (error, results) => {
        if (error) {
            console.error('Error fetching pengaduan:', error);
            return res.status(500).json({ error: 'Failed to fetch pengaduan' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Pengaduan not found' });
        }

        res.status(200).json(results[0]);
    });
});


// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
