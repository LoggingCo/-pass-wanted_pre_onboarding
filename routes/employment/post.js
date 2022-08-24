// import
import express from 'express';

// import
import express from 'express';
import EmPost from '../../models/employment/post';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        await EmPost.create({
            cotnent: req.body.content,
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
        consolee.error(error);
        next(error);
    }
});

router.put('/:empostId', async (req, res, next) => {
    try {
        await EmPost.update(
            {
                cotnent: req.body.content,
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
    } catch (err) {
        console.log(err);
        next(error);
    }
});

export default router;
