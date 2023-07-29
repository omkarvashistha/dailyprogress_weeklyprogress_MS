const weeklyRepo = require('../Model/Schema');
const helper = require('../Utilities/helper');

exports.addScore = async(req,res)=>{
    try {
        const username = req.params.username;
        const date = new Date();
        const points = req.body.points;
        const reason = req.body.reason;
        const id = await helper.getId(username);

        if(id === -1) {
            throw error("Some error occured");
        }

        const weeklyData = {
            id : id,
            reason : reason,
            points : points,
            date : date
        }

        const userInfo = await weeklyRepo.find({username : username});

        console.log(userInfo);

        if(userInfo.length > 0) {
            //console.log(user);
            userInfo[0].weeklyData.push(weeklyData);
            await userInfo[0].save();

            const score = await helper.getScore(username);

            res.status(201).json({
                score : score
            })

        } else {

            await weeklyRepo.create({
                username : username,
                weeklyData : [weeklyData]
            });

            res.status(201).json({
                score : points
            })

        }

    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}

exports.getScore = async(req,res)=>{
    try {
        const username = req.params.username;
        const userInfo = await weeklyRepo.find({username : username});

        if(userInfo.length > 0){
            const score = await helper.getScore(username);
            res.status(200).json({
                score : score
            })
        } else {
            res.status(200).json({
                score : 0
            })
        }

    } catch (error) {
        res.status(400).json({
            data : error.message
        })
    }
}

exports.getWeeklyData = async(req,res)=>{
    try {
        const username = req.params.username;
        const userInfo = await weeklyRepo.find({username : username});

        if(userInfo.length > 0) {
            const weeklyData = await helper.getWeeklyData(username);
            res.status(200).json({
                weeklydata : weeklyData
            })
        } else {
            res.status(200).json({
                weeklydata : []
            })
        }

    } catch (error) {
        res.status(400).json({
            data : error.message
        })
    }
}

exports.invalid = async(req,res,next) => {
    const err = new Error();
    err.message = 'Invalid Route';
    err.status = 404;
    next(err);
};