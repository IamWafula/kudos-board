

const express = require('express');
const routes = express.Router()

const {PrismaClient, Prisma}= require('@prisma/client');
const prisma = new PrismaClient();

const { NotFoundError, ExistingUserError,  } = require('../middleware/CustomErrors');


// const categories = await prisma.category.findMany(
//     {
//         where: {
//             articles: {
//                 some: {
//                     categoryId: {gt: 0}
//                 }
//             }
//         },
//         include: {
//             articles: true
//         },
//         orderBy: {
//             name: 'asc'
//         }
//     }
// );

// unsafe route, remove in production
routes.get('/', async (req, res) => {
    const users = await prisma.user.findMany({
        include: { boards: true, comments: true , cards : true }
    });
    return res.json(users);
});



routes.get('/:id', async (req, res) => {
    const user_id = parseInt(req.params.id);

    const user_info = await prisma.user.findUnique({
        where: {  id: user_id },
        include: { boards: true }
    });

    return res.json(user_info);
});


routes.post('/', async (req, res, next) => {
    const name = req.body.name;

    try {
        const user = await prisma.user.create({
            data: {
                name: `${name}`,
            }
        });

        return res.json(user);
    } catch (error) {
        next(new ExistingUserError());
    }
});



routes.get('/:filter', async (req, res) => {
    const filter = req.params.filter;
    return res.json({message: `Hello World, the filter ${filter} works`});
});

module.exports = routes;
