// import
import express from 'express';
import User from '../../models/user/user';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        await User.create({
            name: req.body.name,
        });
        const user = await User.findOne({
            where: {
                name: req.body.name,
            },
        });
        const data = {
            message: 'success',
            data: user,
        };
        res.status(200).json(data);
    } catch (err) {
        consolee.error(error);
        next(error);
    }
});

export default router;
