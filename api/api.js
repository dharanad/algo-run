const router = require('express').Router();
const {run} = require('../code-engine/engine');

router.post('/run', async (req, res) => {
    const code = req.body.code;
    const fid = new Date().getUTCMilliseconds() / 1000; //FIXME: Make changes
    try {
        const op = await run(fid, code);
        res.send(op);   
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;