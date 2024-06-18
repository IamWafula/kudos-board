

const express = require('express');
const routes = express.Router()

const {PrismaClient, Prisma}= require('@prisma/client');
const prisma = new PrismaClient();


routes.get('/', async (req, res) => {
    const boards = await prisma.board.findMany(
        {
            include: { cards: true }
        }
    );
    return res.json(boards);
});

routes.get('/:board_id', async (req, res) => {
    const board_id = parseInt(req.params.board_id);

    const board = await prisma.board.findUnique({
        where: {
            id: board_id
        },
        include: { cards: true }
    });

    return res.json(board);
});

routes.post('/', async (req, res) => {
    const {title, mediaUrl, description, categoryId, authorId } = req.body;

    console.log(req.body);

    return res.json(req.body);
});

module.exports = routes;
