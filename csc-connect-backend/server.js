const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 5000;
const secretKey = '868yEHVu4k5EmomkwY7k'; // Replace with your actual secret key
let users = [];
let posters = [];

app.use(cors());
app.use(bodyParser.json());

// Register endpoint
app.post(
  '/api/auth/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('username').notEmpty().withMessage('Username is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username } = req.body;
    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const newUser = { id: users.length + 1, email, password, username };
    users.push(newUser);
    res.json({ message: 'User registered successfully', userId: newUser.id });
  }
);

// Login endpoint
app.post(
  '/api/auth/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    res.json({ token, userId: user.id });
  }
);

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Poster endpoints
app.get('/api/posters', (req, res) => {
  res.json(posters);
});

app.post(
  '/api/posters',
  authenticateToken,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('imageUrl').isURL().withMessage('Invalid image URL'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, imageUrl, description } = req.body;
    const newPoster = { id: posters.length + 1, title, imageUrl, description, userId: req.user.userId };
    posters.push(newPoster);
    res.json({ message: 'Poster added successfully', posterId: newPoster.id });
  }
);

app.get('/api/posters/:id', (req, res) => {
  const poster = posters.find((p) => p.id === parseInt(req.params.id));
  if (!poster) return res.sendStatus(404);
  res.json(poster);
});

app.put(
  '/api/posters/:id',
  authenticateToken,
  [
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('imageUrl').optional().isURL().withMessage('Invalid image URL'),
    body('description').optional().notEmpty().withMessage('Description is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const posterIndex = posters.findIndex((p) => p.id === parseInt(req.params.id));
    if (posterIndex === -1) return res.sendStatus(404);
    if (posters[posterIndex].userId !== req.user.userId) return res.sendStatus(403);

    posters[posterIndex] = { ...posters[posterIndex], ...req.body };
    res.json({ message: 'Poster updated successfully' });
  }
);

app.delete('/api/posters/:id', authenticateToken, (req, res) => {
  const posterIndex = posters.findIndex((p) => p.id === parseInt(req.params.id));
  if (posterIndex === -1) return res.sendStatus(404);
  if (posters[posterIndex].userId !== req.user.userId) return res.sendStatus(403);
  posters.splice(posterIndex, 1);
  res.json({ message: 'Poster deleted successfully' });
});

// Get user profile
app.get('/api/users/profile', authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.userId);
  if (!user) return res.sendStatus(404);
  res.json({ id: user.id, email: user.email, username: user.username });
});

// Update user profile
app.put(
  '/api/users/profile',
  authenticateToken,
  [
    body('username').optional().notEmpty().withMessage('Username is required'),
    body('email').optional().isEmail().withMessage('Invalid email'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userIndex = users.findIndex((u) => u.id === req.user.userId);
    if (userIndex === -1) return res.sendStatus(404);

    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json({ message: 'Profile updated successfully' });
  }
);

app.get('/', (req, res) => {
  res.send('CSC Connect Backend');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});