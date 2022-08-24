// import
import express from 'express';
import { SuccessData } from '../../middleware/failureData';
import { FailureData } from '../../middleware/successData';
import Company from '../../models/company/company';
import EmPost from '../../models/employment/post';
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const where = {};
        const emposts = await EmPost.findAll({
            where,
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'skills', 'position', 'compensation'],
            include: [
                {
                    model: Company,
                    attributes: ['name', 'contry', 'region'],
                },
            ],
        });
        if (!emposts) {
            const data = FailureData('공고를 등록해주세요.');
            res.status(400).json(data);
            return;
        } else {
            const data = SuccessData(emposts);
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

export default router;
