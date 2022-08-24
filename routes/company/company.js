// import
import express from 'express';
import Company from '../../models/company/company.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        await Company.create({
            name: req.body.name,
            contry: req.body.contry,
            region: req.body.region,
        });

        const data = {
            message: 'success',
        };

        res.status(200).json(data);
    } catch (err) {
        consolee.error(error);
        next(error);
    }
});
export default router;
