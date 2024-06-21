

const express = require('express');
const routes = express.Router()

const {PrismaClient, Prisma}= require('@prisma/client');
const prisma = new PrismaClient();


routes.get('/search/:board_name', async (req, res) => {

    try{
        const search_term = req.params.board_name;
        const boards = await prisma.board.findMany(

            {where: {
                title : {
                    search: search_term
                }
             }}
        );
        return res.json(boards);
    } catch (e) {
        console.log(e)
    }

});

routes.get('/', async (req, res) => {
    try {
        const boards = await prisma.board.findMany(
            {
                include: { cards: true }
            }
        );
        return res.json(boards);
    }
    catch (e) {
        console.log(e)
    }

});


routes.get('/:board_id', async (req, res) => {
    try {
       const board_id = parseInt(req.params.board_id);

        const board = await prisma.board.findUnique({
            where: {
                id: board_id
            },
            include: { cards: true }
        });

        return res.json(board);
    } catch (e) {
        console.log(e)
    }


});

routes.post('/', async (req, res) => {
    try {
        const {title, mediaUrl, description, categoryId, authorId } = req.body;

        const board = await prisma.board.create({
            data: {
                title,
                mediaUrl,
                description,
                categoryId: parseInt(categoryId),
                authorId : parseInt(authorId)
            }
        })

        return res.json(req.body);
    } catch (e) {
        console.log(e)
    }

});

routes.delete("/:id" , async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await prisma.board.delete({
            where: { id: id }
        })

        return res.json({"text": "successful"})
    } catch (e) {
        console.log(e)
    }

})

module.exports = routes;
