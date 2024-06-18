

const express = require('express');
const routes = express.Router()

const {PrismaClient, Prisma}= require('@prisma/client');
const prisma = new PrismaClient();


routes.get('/', async (req, res) => {
    return res.json({message: 'Hello World, the filter route works'});
});

routes.get('/:filter', async (req, res) => {
    const filter = req.params.filter;
    return res.json({message: `Hello World, the filter ${filter} works`});
});

module.exports = routes;
