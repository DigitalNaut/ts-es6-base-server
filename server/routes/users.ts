import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (_, res) => {
  res.send('respond with a resource');
});

export default router;
