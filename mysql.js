var express = require("express");
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'Bill@2017',
    database: 'expensesDB',
    debug: false
});

// function execQuery(req, res, query) {
//     pool.getConnection(function (err, connection) {
//         if (err) {
//             res.json({"code": 100, "status": "Error in connection database", "error": err.message});
//             return;
//         }
//
//         console.log('connected as id ' + connection.threadId);
//
//         connection.query(query, function (err, rows) {
//             connection.release();
//             if (!err) {
//                 res.json(rows);
//             }
//         });
//
//         connection.on('error', function (err) {
//             res.json({"code": 100, "status": "Error in connection database"});
//             return;
//         });
//     });
// }

function getUsers(req, res) {

    // return execQuery(req, res, "select * from users where active = 1");

    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database", "error": err.message});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from users where active = 1", function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
}

function addUser(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var insertSql = "insert into users (id, name, firstName, lastName, address, phone, department) values (" + req.body.id + ",'" + req.body.name + "','" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.address + "','" + req.body.phone + "','" + req.body.department + "')";

        console.log(insertSql);

        connection.query(insertSql, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
}

function updateUser(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var updateSql = "update users set name = '" + req.body.firstName + ' ' + req.body.lastName + "', firstName = '" + req.body.firstName + "', lastName = '" + req.body.lastName + "', address = '" + req.body.address + "', phone = '" + req.body.phone + "', department = '" + req.body.department + "' where id = " + req.body.id;

        console.log(updateSql);

        connection.query(updateSql, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
}

function deleteUser(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var deleteSql = "update users set active = 0 where id = " + req.body.id;

        console.log(deleteSql);

        connection.query(deleteSql, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
}

function handle_upload(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var insertSql = "insert into invoices (type, amount, invoiceDate, createDate, employeeName, empId, image) values ('" + req.body.type + "'," + req.body.amount + "," + req.body.invoiceDate + "," + req.body.createDate + ",'" + req.body.empName + "'," + req.body.empId + ",'" + req.body.image + "')";

        console.log(insertSql);

        connection.query(insertSql, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
}

function get_invoices(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        res.header("Access-Control-Allow-Origin", "*");

        connection.query('select * from invoices where active = 1', function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
}

function handle_expencesTypes(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        res.header("Access-Control-Allow-Origin", "*");

        connection.query('select * from expensesTypes', function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
}

function deleteInvoice(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var deleteSql = "update invoices set active = 0 where id = " + req.body.invoiceId;

        console.log(deleteSql);

        connection.query(deleteSql, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
}

app.get("/test", function (req, res) {
    console.log('Test');
    res.json({"code": 1, "status": "Ok"});
    return;
});

app.get("/users", function (req, res) {
    getUsers(req, res);
});

app.post("/upload", function (req, res) {
    console.log(req.body);
    handle_upload(req, res);
});

app.get("/invoices", function (req, res) {
    get_invoices(req, res);
});

app.post("/invoices/delete", function (req, res) {
    deleteInvoice(req, res);
});

app.get("/expTypes", function (req, res) {
    handle_expencesTypes(req, res);
});

app.post("/user/add", function (req, res) {
    addUser(req, res);
});

app.post("/user/update", function (req, res) {
    updateUser(req, res);
});

app.post('/user/delete', function (req, res) {
    deleteUser(req, res)
});

app.listen(8080);