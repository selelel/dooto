// import prisma = require('../lib/prisma');
import { prisma } from '../lib/prisma'

import express = require('express')
const router = express.Router()

router.get('/', async (_, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);  // Use res.json to send JSON response
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router