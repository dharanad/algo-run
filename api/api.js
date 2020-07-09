const router = require('express').Router();
const {run} = require('../code-engine/engine');

router.post('/run', async (req, res) => {
    const code = req.body.code;
    const fid = Math.floor(Math.random() * 1000);
    try {
        const op = await run(fid, code);
        res.send(op);   
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;