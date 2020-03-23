const express = require('express')
const routes = express.Router()
const { Customer, ValidateInput } = require('../schemas/Customer')

routes.get('/', async (req, res) => {

    const customer = await Customer.find()

    if(customer.length == 0)
        return res.send('Não há nada no banco de dados')

    res.send(customer)
})

routes.post('/', async (req, res) => {

    const result = ValidateInput(req.body)

    if (result.error)
        return res.status(400).send(result.error.details[0].message)

    const findInDb = await Customer.find({phone : result.value.phone})

    if(findInDb.length >= 1)
        return res.status(400).send('Já existe esse usuário no bando de dados...')    

    const customer = new Customer({
        name : result.value.name,
        isGold : result.value.isGold,
        phone : result.value.phone
    })

    const newCustomer = await customer.save()
    res.send(newCustomer)

})

routes.put('/:id', async (req, res) => {
    try{
        const findInDb = await Customer.find({ phone : req.body.phone })
        
        if(findInDb.length >= 1)
            return res.status(400).send('Já existe esse usuário no bando de dados...')
            
        const result = ValidateInput(req.body)
    
        if (result.error)
            return res.status(400).send(result.error.details[0].message)
    
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            name : result.value.name,
            isGold : result.value.isGold,
            phone : result.value.phone
        }, {new : true})

        res.send(customer)
    
        }
        catch(err) {
            res.status(404).send("Não há no banco de dados usuário com esse ID")
        }
})


module.exports = routes