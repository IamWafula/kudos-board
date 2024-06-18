

const express = require('express');
const routes = express.Router()

const {PrismaClient, Prisma}= require('@prisma/client');
const prisma = new PrismaClient();


routes.get('/', async (req, res) => {
    return res.json({message: 'Hello World, the filter route works'});
});

routes.get('/:board_id', async (req, res) => {
    const board_id = req.params.board_id;
    return res.json({message: `Hello World, the board page for id= ${board_id} works`});
});

module.exports = routes;
