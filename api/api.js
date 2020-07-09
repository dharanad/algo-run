const router = require('express').Router();

router.post('/run', (req, res) => {
    const code = req.body.code;
    res.status(200).send('Code Submitted');
});

module.exports = router;