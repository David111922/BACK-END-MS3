const router = require('express').Router()
const db = require("../models")

router.post('/', async (req, res) => {
    try{
    //! snippet below used to create new user
    const user = await db. User.create(req.body)
    // 201 indicates successfully processed .201 for post
    res.status(201).json(user);
} catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
}
});


router.get('/', async (req, res) => {
    try{
    // !snippet below used to retrieve all users from db
    const users = await db.User.findAll()
    res.status(200).json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Failed to retrieve users" });
    }
});
module.exports = router