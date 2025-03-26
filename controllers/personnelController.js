const { Personnel } = require("../models");

const getPersonnel = async (req, res) => {
    try {
        const personnel = await Personnel.findAll();
        res.status(200).json(personnel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addPersonnel = async (req, res) => {
    try {
        const { personId, name, role, email, phone, isActive } = req.body;
        
        const personnel = await Personnel.create({
            personId,
            name,
            role,
            email,
            phone,
            isActive
        });

        return res.status(201).json(personnel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePersonnel = async (req, res) => {
    try {
        const { id } = req.params;
        const { personId, name, role, email, phone, isActive } = req.body;

        const personnel = await Personnel.findByPk(id);
        if (!personnel) {
            return res.status(404).json({ message: "Personnel not found" });
        }

        if (personId) personnel.personId = personId;
        if (name) personnel.name = name;
        if (role) personnel.role = role;
        if (email) personnel.email = email;
        if (phone) personnel.phone = phone;
        if (isActive) personnel.isActive = isActive;

        await personnel.save();
        return res.status(200).json({ message: "Personnel updated", personnel });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changePersonnelStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (typeof isActive !== 'boolean') {
            return res.status(400).json({ error: "Invalid status value. Use true or false." });
        }

        const personnel = await Personnel.findByPk(id);
        if (!personnel) {
            return res.status(404).json({ error: "Personnel not found" });
        }

        personnel.isActive = isActive;
        await personnel.save();

        res.json({ message: `Status updated to ${isActive}`, personnel });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getPersonnel, addPersonnel, updatePersonnel, changePersonnelStatus };
