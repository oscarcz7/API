const router = require('express').Router();

const Service =   require('../models/serviceModel');

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890', 5);

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Working',
        message: 'This is the service API endpoint',
    });
});

router.post('/services', async (req, res) => {
    const body = {
        serviceID : nanoid(),
        serviceType : req.body.serviceType,
        cost : req.body.cost,
        petId : req.body.petId,
        creation_date : req.body.creation_date,
        estimated_date : req.body.estimated_date,
        status : req.body.status
    }
    try {
        const service = await Service.create(body);
        res.json(service)
    } catch (error) {
        return res.status(500)
    }
});

router.get('/services/:serviceID', async (req, res) => {
    const serviceID = req.params.serviceID;
    try {
        const service = await Service.findOne({ serviceID });
        res.json(service);
    } catch (error) {
        return res.status(400)
    }
});

router.get('/services', async (req, res) => {
    try {
        const service = await Service.find();
        res.json(service);
    } catch (error) {
        return res.status(400)
    }
});

router.delete('/services/:serviceID', async (req, res) => {
    const serviceID = req.params.serviceID;
    try {
        const service = await Service.findOneAndDelete({ serviceID });
        if (!service) {
            return res.json({
                msg: 'Dont exists',
                error
            })
        }
        res.json(service)
    } catch (error) {
        return res.status(400);
    }
})

router.put('/services/:serviceID', async (req, res) => {
    const serviceID = req.params.serviceID;
    const body = req.body;
    try {
        const service = await Service.findOneAndUpdate(
            serviceID,
            body,
            { new: true });
        res.json(service);
    } catch (error) {
        return res.status(400);
    }
})

router.patch('/services/:serviceID', async (req, res) => {
    const serviceID = req.params.serviceID;
    const body = req.body;
    try {
        const service = await Service.findOneAndUpdate(
            serviceID,
            body,
            { new: true });
        res.json(service);
    } catch (error) {
        return res.status(400);
    }
})
// Export API routes
module.exports = router;