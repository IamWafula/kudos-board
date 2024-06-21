

const express = require('express');
const routes = express.Router()

const {PrismaClient, Prisma}= require('@prisma/client');
const { NotFoundError } = require('../middleware/CustomErrors');
const prisma = new PrismaClient();

// route to get all cards, no board info, wherever useful
routes.get('/', async (req, res) => {

    try {
        const cards = await prisma.card.findMany();
        return res.json(cards);
    } catch(e) {
        console.log(e)
    }

});

// route on card page, shows comments and other card info
routes.get('/:card_id', async (req, res, next) => {

    try {

        const card_id = parseInt(req.params.card_id);

        const card = await prisma.card.findUnique({
            where: { id : card_id },
            include: { comments: true }
        });

        if (card) {
            return res.json(card);
        }

        next(new NotFoundError)
    } catch(e) {
        console.log(e)
    }

});

// route to create a card
routes.post('/', async (req, res) => {

    try {
        const { text, gifUrl, author, board  } = req.body;

        const card = await prisma.card.create({
            data: {
                text,
                gifUrl,
                authorId : author ? parseInt(author) : null,
                boardId : parseInt(board)
            }
        });


        return res.json(card);
    } catch(e) {
        console.log(e)
    }

});

routes.delete("/:id" , async (req, res) => {

    try {
        const id = parseInt(req.params.id);

        const deleted = await prisma.card.delete({
            where: { id: id }
        })

        return res.json({"text": "successful"})
    } catch(e) {
        console.log(e)
    }

})


module.exports = routes;
