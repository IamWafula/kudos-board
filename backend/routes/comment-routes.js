

const express = require('express');
const routes = express.Router()

const {PrismaClient, Prisma}= require('@prisma/client');
const prisma = new PrismaClient();


/*
    Since comments are already loaded in the cards route, all we need to do is make post requests for a new comment
*/


routes.post('/', async (req, res) => {

    // using let since variable is parsed to Int later
    let {text, author, card} = req.body;
    author = parseInt(author);
    card = parseInt(card);

    const new_comment = await prisma.comment.create({
        data: {
            text,
            authorId : author,
            cardId : card
        }
    });

    return res.json(req.body);
});

routes.get('/all', async (req, res) => {
    console.log(req);
    const all_comments = await prisma.comment.findMany();

    return res.json(all_comments);
});

module.exports = routes;
