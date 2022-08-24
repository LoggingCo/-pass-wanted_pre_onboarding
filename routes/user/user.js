// import
import express from 'express';
import { SuccessData } from '../../middleware/failureData';
import User from '../../models/user/user';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        await User.create({
            name: req.body.name,
        });
        const data = SuccessData();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default router;
