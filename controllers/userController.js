const bcrypt = require("bcryptjs");
const { User } = require("../models");

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!password) {
            return res.status(400).json({ error: "La contraseña es obligatoria" });
        }

       
            const user = await User.create({
                name,
                email,
                password
            });

            return res.status(201).json(user);
        


    } catch (error) {
        res.status(500).json({ error: error.message, error_2 : error })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            user.password = await bcrypt.hash(password, 10); 
        }

        await user.save();
        return res.status(200).json({ message: "User updated", user })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

const changeUserStatus = async (req, res) => {
    try {
        const { id } = req.params; 
        const { state } = req.body; 

        
        if (!["Active", "Inactive"].includes(state)) {
            return res.status(400).json({ error: "Invalid state. Use 'Active' or 'Inactive'." });
        }

       
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        
        user.state = state;
        await user.save();

        res.json({ message: `State updated to ${state}`, user });
    } catch (error) {
        console.error("Error while changing state:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();

        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getUsers, addUser, updateUser, changeUserStatus,deleteUser }