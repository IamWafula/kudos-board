const express = require('express');
const routes = express.Router()

const {PrismaClient, Prisma}= require('@prisma/client');
const prisma = new PrismaClient();

const { NotFoundError, ExistingUserError,  } = require('../middleware/CustomErrors');


routes.post('/:name', async (req, res) => {
    try {
        const category_name = req.params.name;

        const new_category = await prisma.category.create({
            data: {
                name : category_name
            }
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = routes;
