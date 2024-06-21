

const express = require('express');
const routes = express.Router()

const {PrismaClient, Prisma}= require('@prisma/client');
const prisma = new PrismaClient();

const { NotFoundError, ExistingUserError,  } = require('../middleware/CustomErrors');


// unsafe route, remove in production
routes.get('/', async (req, res) => {

    try {
        const users = await prisma.user.findMany({
            include: { boards: true, comments: true , cards : true }
        });
        return res.json(users);
    } catch (e) {
        console.log(e)
    }


});

routes.get('/username/:username', async (req, res) => {
    try
    {
        const user = await prisma.user.findUnique({
            where: { name: req.params.username}
        });
        return res.json(user);
    }catch(e) {
        console.log(e)
    }
});



routes.get('/:id', async (req, res) => {

    try {
        const user_id = parseInt(req.params.id);
        const user_info = await prisma.user.findUnique({
            where: {  id: user_id },
            include: { boards: true }
        });

        return res.json(user_info);
    } catch (e) {
        console.log(e)
    }

});


routes.post('/', async (req, res, next) => {

    try {
        const name = req.body.name;

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




module.exports = routes;
