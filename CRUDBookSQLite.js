const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

//เชื่อม database สร้าง file Book.sqlite
const db = new sqlite3.Database('./Database/Book.sqlite');

app.use(express.json());

//สร้าง table books 
db.run(`CREATE TABLE IF NOT EXISTS books(
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
)`);

//รับค่า books
app.get('/books', (req, res) => {
    db.all('SELECT * FROM books', (err, rows) => {
        if(err) {
            res.status(500).send(err);
        }else {
            res.json(rows);
        }
    });
});

//รับค่า id
app.get('/books/id', (req, res) => {
    db.get('SELECT * FROM books WHERE id = ?', req.params.id, (err, rows) => {
        if(err) {
            res.status(500).send(err);
        }else{
            if(!row) {
                res.status(404).send('Book not found');
            }else {
            res.json(row);
        }
    }
    });
});

//เพิ่ม  book
app.post('/books', (req, res) => {
    const book = req.body;
    db.run('INSERT INTO books(title, author) VALUES (?, ?)', book.title, book.author, function(err) {
        if(err) {
            res.status(500).send(err);
        }else {
            book.id = this.lastID;
            res.send(rows);
        }
    });
});

//อัพเดต  book
app.put('/books/id', (req, res) => {
    db.run('UPDATE books SET title = ?, author = ? WHERE id = ?',  book.title, book.author, req.params.id, function(err) {
        const book = req.body;
        if(err) {
            res.status(500).send(err);
        }else{
            res.send(book);
        }
    
    });
});

//ลบ  book
app.delete('/books/id', (req, res) => {
    db.run('DELETE FROM books WHERE id = ?', req.params.id, function(err) {
        if(err) {
            res.status(500).send(err);
        }else{
            res.send(book);
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

