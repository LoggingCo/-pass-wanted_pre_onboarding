import express from 'express';
import { SuccessData } from '../../middleware/failureData';
import EmApply from '../../models/employment/apply';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        await EmApply.create({
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
