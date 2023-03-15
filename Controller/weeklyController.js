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