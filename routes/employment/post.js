// import
import express from 'express';
import { SuccessData } from '../../middleware/failureData';
import { FailureData } from '../../middleware/successData';
import Company from '../../models/company/company';
import EmPost from '../../models/employment/post';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        await EmPost.create({
            content: req.body.content,
            skills: req.body.skills,
            position: req.body.position,
            compensation: req.body.compensation,
            CompanyId: req.body.company,
        });
        const data = SuccessData();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.put('/:empostId', async (req, res, next) => {
    try {
        await EmPost.update(
            {
                content: req.body.content,
                skills: req.body.skills,
                position: req.body.position,
                compensation: req.body.compensation,
                CompanyId: req.body.company,
            },
            {
                where: {
                    id: req.params.empostId,
                },
            },
        );
        const empost = await EmPost.findOne({ where: { id: req.params.empostId } });
        if (!empost) {
            const data = FailureData('존재하지 않는 공고입니다.');
            res.status(400).json(data);
            return;
        } else {
            const data = SuccessData(empost);
            res.status(200).json(data);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:empostId', async (req, res, next) => {
    try {
        const empost = await EmPost.findOne({ where: { id: req.params.empostId } });
        if (!empost) {
            const data = FailureData('존재하지 않는 공고입니다.');
            res.status(400).json(data);
            return;
        } else {
            const fullPost = await EmPost.findOne({
                where: { id: empost.id },
                attributes: ['id', 'content', 'skills', 'position', 'compensation'],
                include: [
                    {
                        model: Company,
                        attributes: ['name', 'country', 'region'],
                    },
                ],
            });

            const anotherPost = await EmPost.findAll({
                where: { CompanyId: empost.CompanyId },
                attributes: ['id'],
            });

            const anotherPostId = new Array();
            console.log(fullPost);
            anotherPost.map((v) => v.id !== fullPost.id && anotherPostId.push({ id: v.id }));

            const fullData = {
                post: fullPost,
                anotherPostId: anotherPostId,
            };

            const data = SuccessData(fullData);
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.delete('/:empostId', async (req, res, next) => {
    try {
        const empost = await EmPost.findOne({ where: { id: req.params.empostId } });
        if (!empost) {
            const data = FailureData('공고가 존재하지 않습니다.');
            res.status(400).json(data);
            return;
        } else {
            await EmPost.destroy({
                where: { id: empost.id },
            });
            const data = SuccessData();
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

export default router;
