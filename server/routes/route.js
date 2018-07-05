const express = require('express');
const router = express.Router();
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://gmjzriga:wCp7FlF7wovvWkIGcpMOrGdfbecRBK62@elmer.db.elephantsql.com:5432/gmjzriga';
const pool = new pg.Pool({
    connectionString: connectionString
});


router.get('/api/v1/todos', (req, res, next) => {
    // Get a Postgres client from the pool
    pool.connect((err, client, done) => {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        client.query('SELECT * FROM items ORDER BY id ASC;', (err, result) => {
            done();
            if (err) {
                return console.error('get records failed', err)
            }
            res.status(200).send(result.rows);
        });
    });
});

router.post('/api/v1/todos', (req, res, next) => {
    const data = { text: req.body.text, complete: false };

    pool.connect((err, client, done) => {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        client.query('INSERT INTO items(text, complete) values($1, $2)',
            [data.text, data.complete], (err, result) => {
                done();
                if (err) {
                    return console.error('post record failed', err)
                }
                res.status(201).send('create successfully');
            });
    });
});

router.put('/api/v1/todos/:todo_id', (req, res, next) => {
    const id = req.params.todo_id;
    const data = { text: req.body.text, complete: req.body.complete };

    pool.connect((err, client, done) => {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        client.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
            [data.text, data.complete, id], (err, result) => {
                done();
                if (err) {
                    return console.error('update record failed', err)
                }
                res.status(200).send('update successfully');
            });
    });
});

router.delete('/api/v1/todos/:todo_id', (req, res, next) => {
    const id = req.params.todo_id;

    pool.connect((err, client, done) => {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        client.query('DELETE FROM items WHERE id=($1)', [id], (err, result) => {
            done();
            if (err) {
                return console.error('delete record failed', err)
            }
            res.status(200).send('delete successfully');
        });
    });
});

module.exports = router;