// import
import express from 'express';
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

        const data = {
            message: 'success',
        };

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
            const data = {
                message: 'failure',
                data: '존재하지 않는 공고입니다.',
            };
            res.status(400).json(data);
            return;
        } else {
            const data = {
                message: 'success',
                data: empost,
            };
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
            const data = {
                message: 'failure',
                data: '존재하지 않는 공고입니다.',
            };
            res.status(400).json(data);
            return;
        } else {
            const fullPost = await EmPost.findAll({
                where: { id: empost.id },
                attributes: ['id', 'content', 'skills', 'position', 'compensation'],
                include: [
                    {
                        model: Company,
                        attributes: ['name', 'contry', 'region'],
                    },
                ],
            });
            const data = {
                message: 'success',
                data: fullPost,
            };
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});
export default router;
