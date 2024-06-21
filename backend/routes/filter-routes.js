

const express = require('express');
const routes = express.Router()

const {PrismaClient, Prisma}= require('@prisma/client');
const { NotFoundError } = require('../middleware/CustomErrors');
const prisma = new PrismaClient();


routes.get("/myboards/:id", async (req, res) => {
    const user_id = parseInt(req.params.id);

    const queryResults = await prisma.board.findMany({
        where: { authorId :  user_id},
        orderBy: { date_published : 'desc' },
        include: {cards : true}
    })

    return res.json(queryResults);
})


routes.get('/', async (req, res) => {
    return res.json({message: 'Hello World, the filter route works'});
});



routes.get('/:filter', async (req, res, next) => {


    try {
        const filter = req.params.filter;
        let queryResults = {}

        // a better way to do this is with a dictionary
        if (filter == 'recent') {
            queryResults = await prisma.board.findMany({
                orderBy: { date_published : 'desc' },
                include: {cards : true}
            })
        } else if (filter == 'celebration') {
            queryResults = await prisma.board.findMany({
                where: { categoryId: 1 },
                include: {cards : true}
            })
        } else if (filter == 'inspiration') {
            queryResults = await prisma.board.findMany({
                where: { categoryId: 3 },
                include: {cards : true}
            })
        } else if (filter == 'thanks') {
            queryResults = await prisma.board.findMany({
                where: { categoryId: 2 },
                include: {cards : true}
            })
        } else if (filter == 'all') {
            queryResults = await prisma.board.findMany({
                include: {cards : true}
            })
        } else {
            next(new NotFoundError)
        }

        return res.json(queryResults);
    } catch(e) {
        console.log(e)
    }


});

module.exports = routes;
