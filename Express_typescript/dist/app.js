"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
const port = 3000; // You can choose any available port number
// PostgreSQL configuration
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'database-1.cyiydomg2lvj.ap-south-1.rds.amazonaws.com',
    database: 'postgres',
    password: 'Vyshnavi',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// CRUD operations
app.get('/persons', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        const result = yield client.query('SELECT * FROM persons');
        console.log(result);
        client.release();
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching persons' });
    }
}));
app.get('/persons/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = yield pool.connect();
        const result = yield client.query('SELECT * FROM persons WHERE id = $1', [id]);
        console.log(result);
        client.release();
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching persons' });
    }
}));
app.get('/persons/:id/addresses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const client = yield pool.connect();
        const result = yield client.query('SELECT * FROM addresses WHERE person_id = $1', [id]);
        client.release();
        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching addresses');
    }
}));
app.post('/persons', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, phone_number } = req.body;
        console.log(req);
        const client = yield pool.connect();
        const result = yield client.query('INSERT INTO persons (first_name, last_name, phone_number) VALUES ($1, $2, $3)', [first_name, last_name, phone_number]);
        console.log(result);
        client.release();
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating person' });
    }
}));
app.put('/persons/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { first_name, last_name, phone_number } = req.body;
        const client = yield pool.connect();
        const result = yield client.query('UPDATE persons SET first_name = $1, last_name = $2,phone_number = $3  WHERE id = $4', [first_name, last_name, phone_number, id]);
        client.release();
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating user' });
    }
}));
app.delete('/persons/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = yield pool.connect();
        const result = yield client.query('DELETE FROM Persons WHERE id = $1', [id]);
        client.release();
        res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting user' });
    }
}));
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
