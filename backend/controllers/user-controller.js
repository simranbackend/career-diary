const userService = require('../services/user-service.js');

exports.sendOtp = async (req, res) => {
    try {
        let data = await userService.sendOtp(req);
        if(data.status) {
            res.status(200).json({
                status: true,
                message: data.message,
                data: data.data
            })
        } else {
            res.status(400).json({
                status: false,
                message: data.message
            })
        }
    } catch (error) {
        console.log("SendOtp Error", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

exports.login = async (req, res) => {
    try {
        let data = await userService.login(req);
        if(data.status) {
            res.status(200).json({
                status: true,
                message: data.message,
                data: data.data
            })
        } else {
            res.status(400).json({
                status: false,
                message: data.message
            })
        }
    } catch (error) {
        console.log("login Error", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

exports.logout = async (req, res) => {
    try {
        let data = await userService.logout(req);
        if (data.status) return res.status(200).json(data);
        return res.status(400).json(data);
    } catch (error) {
        console.log('logout Error', error);
        return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}