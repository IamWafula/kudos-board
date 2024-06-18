

const express = require('express');
const routes = express.Router()

const {PrismaClient, Prisma}= require('@prisma/client');
const { NotFoundError } = require('../middleware/CustomErrors');
const prisma = new PrismaClient();


routes.get('/', async (req, res) => {
    return res.json({message: 'Hello World, the filter route works'});
});


routes.get('/:filter', async (req, res, next) => {
    const filter = req.params.filter;
    let queryResults = {}

    if (filter == 'recent') {
        queryResults = await prisma.board.findMany({
            orderBy: { date_published : 'desc' }
        })
    } else if (filter == 'celebration') {
        queryResults = await prisma.board.findMany({
            where: { categoryId: 1 }
        })
    } else if (filter == 'inspiration') {
        queryResults = await prisma.board.findMany({
            where: { categoryId: 1 }
        })
    } else if (filter == 'thanks') {
        queryResults = await prisma.board.findMany({
            where: { categoryId: 1 }
        })
    } else {
        next(new NotFoundError)
    }

    return res.json(queryResults);

});

module.exports = routes;
