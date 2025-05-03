const UserService = require('../services/UserService');

exports.register = async (req, res) => {
    try {
        const user = await UserService.registerUser(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const token = await UserService.loginUser(req.body);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserService.allUsers()
        res.json(users)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.getByIdUser = async (req, res) => {
    try {
        const user = await UserService.getUser(req.params.id)
        if (!user) return res.status(400).json({ error: 'User Not Found' })
        res.json(user)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await UserService.deleteUser(req.params.id)
        if (!user) return res.status(400).json({ error: 'User Not Found' })
        res.json(user)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
