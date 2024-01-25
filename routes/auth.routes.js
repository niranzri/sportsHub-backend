const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/route-guard.middleware");


// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Checks if the email or password or name provided are empty strings
    if (email === "" || password === "" || name === "") {
        res.status(400).json({ message: "Provide email, password and name." });
        return;
    }

    // Validate the email format with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Provide a valid email address.' });
        return;
    }

    // Validates the password format with regex
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }

    try {
        const foundUser = await User.findOne({ email: email.toLowerCase().trim() })

        if (foundUser) {
            res.status(400).json({ message: 'User already exists.' });
            return;
        }

        const salt = bcrypt.genSaltSync(saltRounds)
        const saltRounds = 10;
        const passwordHash = bcrypt.hashSync(password, salt)
        const userToRegister = { name: name, email: email, passwordHash }

        const newUser = await User.create(userToRegister)
        res.status(201).json({ message: 'User created.', newUser })
        console.log(newUser)

    } catch (error) {
        res.status(500).json({ message: 'Error creating user.', error })
        console.log(error)
    }
})

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const potentialUser = await User.findOne({ email: email.toLowerCase().trim() })
        // Checks if user is already in the db
        if (potentialUser) {
            // Checks if password is correct
            if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
                const authToken = jwt.sign(
                    {
                        userId: potentialUser._id,
                    },
                    process.env.TOKEN_SECRET,
                    {
                        algorithm: 'HS256',
                        expiresIn: '5h',
                    })
                // Sends token to the client
                res.status(200).json({ authToken: authToken }) 
            }
            else {
                res.status(403).json({ message: 'Incorrect password.' })
            }
        }
        else {
            res.status(404).json({ message: `User ${name} not found.` })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Error logging in ${name}.`, error})
    }
})

// VERIFY ROUTE
router.get('/verify', isAuthenticated, async (req, res) => {
    // Check by which name the decoded token payload is added to req object in middleware
    console.log(req.tokenPayload)
    const currentUser = await User.findById(req.tokenPayload.userId)
    res.status(200).json(currentUser)
})

module.exports = router;





