const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Pinged /api')
});

module.exports = router;