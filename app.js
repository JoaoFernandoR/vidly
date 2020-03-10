const express = require('express')
const server = express()

courses = [
    {id : 1, course : "course1" },
    {id : 2, course : "course2" },
    {id : 3, course : "course3" },
    {id : 4, course : "course4" },
]

server.get('/', (req, res) => {
    res.send("Página inicial")
})

server.get('/api/courses', (req, res) => {
    res.send(courses)
})

server.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) 
       return res.send("O curso com o id em questão não foi encontrado em nosso sistema")
       
    res.send(course)
})


server.listen(3002, () => console.log('Escutando na porta 3002...'))