const express = require('express')
const Joi = require('@hapi/joi')
const server = express()

server.use(express.json())

courses = [
    {id : 1, name : "course1" },
    {id : 2, name : "course2" },
    {id : 3, name : "course3" },
    {id : 4, name : "course4" },
]


// Validando nossa requisiçaõ
const ValidateCourse = (requisicao) => {

    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })

    return schema.validate(requisicao)
}

// Rotas de GET
server.get('/', (req, res) => {
    res.send("Página inicial")
})

server.get('/api/courses', (req, res) => {
    res.send(courses)
})

server.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) 
       return res.status(404).send("O curso com o id em questão não foi encontrado em nosso sistema")

    res.send(course)
})

// Rotas de post

server.post('/api/courses', (req, res) => {

    const result = ValidateCourse(req.body)

    console.log(result)

    if(result.error) 
    // Bad request
        return res.status(400).send(result.error.details[0].message)

    // if (!req.body.name)
    //     return res.status(400).send("name of the course doesnt exist")

    // if (req.body.name.length === 0 || req.body.name.length === 1 )
    //     return res.status(400).send('Name of the course too short')

    const course = {
        id : courses.length + 1,
        name : req.body.name
    }

    courses.push(course)
    res.send(course)
})

//Rotas de put
server.put('/api/courses/:id', (req, res) => {

    const result = ValidateCourse(req.body)

    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course)
        return res.status(404).send("Não há um curso com esse ID.")

    if (result.error)
        return res.status(400).send(result.error.details[0].message)   

    // encontrando o indíce na lista de onde foi encontrado o item com o id requerido    
    // indicedalista = courses.indexOf(course)
    // console.log(indicedalista)
    // courses[indicedalista].name  = req.body.name

    course.name = req.body.name
    res.send(courses)

})

// Rotas de delete

server.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course)
        return res.status(404).send("Não existe nenhum curso com esse ID.")

    indiceDaLista = courses.indexOf(course)
    
    courses.splice(indiceDaLista, 1)    

    res.send(course)
})

server.listen(3002, () => console.log('Escutando na porta 3002...'))