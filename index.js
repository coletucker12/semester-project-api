const restify = require('restify')
const config = require('./config')
const corsMiddleware = require('restify-cors-middleware')

const conn = config.db.get
conn.connect()
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
})
const server = restify.createServer();

server.get('/api/courses', function (req, res, next) {
    conn.query("select * from course", function (err, results, fields) {
        if (err) throw err;
        res.setHeader('content-type', 'text/plain')
        res.end(JSON.stringify(results))
    })
})

server.get('/api/students', function (req, res, next) {
    conn.query("select * from student", function (err, results, fields) {
        if (err) throw err;
        res.setHeader('content-type', 'text/plain')
        res.end(JSON.stringify(results))
    })
})

server.get('/api/enrollments', function (req, res, next) {
    conn.query("select * from enrollment", function (err, results, field) {
        if (err) throw err;
        res.setHeader('content-type', 'text/plain')
        res.end(JSON.stringify(results))
    })
})

server.post('/api/course', function (req, res, next) {
    const postData = req.body
    conn.query(`insert into course (CourseNum, DeptCode, Title, CreditHours) 
                values (${postData.courseNum}, ${postData.deptCode}, "${postData.title}", ${postData.creditHours})`,
        function (err, results, fields) {
            if (err) throw err;
            res.setHeader('content-type', 'text/plain')
            res.end(JSON.stringify(results))
        })
})

server.post('/api/student', function (req, res, next) {
    const postData = req.body
    conn.query(`insert into student (StudentId, StudentName, Major) 
                values (${postData.studentId}, "${postData.studentName}", "${postData.major}")`,
        function (err, results, fields) {
            if (err) throw err;
            res.setHeader('content-type', 'text/plain')
            res.end(JSON.stringify(results))
        })
})

server.post('/api/enrollment', function (req, res, next) {
    const postData = req.body
    conn.query(`insert into enrollment (StudentId, DeptCode, CourseNum) 
                values (${postData.studentId}, ${postData.deptCode}, ${postData.courseNum})`,
        function (err, results, fields) {
            if (err) throw err;
            res.setHeader('content-type', 'text/plain')
            res.end(JSON.stringify(results))
        })
})

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(config.port, function () {
    console.log(`${server.name} listening at ${server.url}`)
})