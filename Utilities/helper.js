const weeklyRepo = require('../Model/Schema');

exports.getScore = async(username) => {
    try {
        const userInfo = await weeklyRepo.find({username : username});
        const monday = getMonday(new Date());

        let score = 0;

        userInfo.forEach(element => {
            element.weeklyData.forEach(ele => {
                if(ele.date >= monday) {
                    score+=ele.points;
                }
            });
        })

        return score;


    } catch (error) {
        console.log(error.message);
    }
}

exports.getWeeklyData = async(username) => {
    try {
        const userInfo = await weeklyRepo.find({username : username});
        const monday = getMonday(new Date());

        let score = [];
        let i=0;
        userInfo.forEach(element => {
            
            
            
            element.weeklyData.forEach(ele => {
                console.log("tesat",ele);
                let eleData = [];
                if(ele.date >= monday) {
                    eleData.push(ele.reason);
                    eleData.push(ele.date);
                    eleData.push(ele.points);
                }
                
                if(eleData.length > 0){
                    score.push(eleData);
                }
            });
            
            
        })

        return score;


    } catch (error) {
        console.log(error.message);
    }
}

exports.getId = async(username) => {
    try {
        const userData = await weeklyRepo.findOne({username : username});
        console.log(userData);

        if(userData!=null){
            return userData.weeklyData.length + 1
        } else {
            return 1;
        }

    } catch (error) {
        console.log(error);
        return -1;
    }
}

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay()
    var diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    d.setHours(0);	d.setMinutes(0); d.setSeconds(0);
    return new Date(d.setDate(diff));
}