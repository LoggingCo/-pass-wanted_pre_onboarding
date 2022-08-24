import express from 'express';
import { SuccessData } from '../../middleware/failureData';
import EmSupport from '../../models/employment/support';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        await EmSupport.create({
            UserId: req.body.userIdx,
            EmPostId: req.body.postIdx,
        });
        const data = SuccessData();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
export default router;
