const express = require('express');

const db = require('./userDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
	const userData = req.body;
	db.insert(userData)
		.then(user => {
			console.log('users post', user);
			res.status(200).json(user);
		})
		.catch(err => {
			res.status(500).json({
				error: 'There was an error while saving the user to the database'
			});
		});
});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {
	// can not re use the res
	db.get()
		.then(user => {
			// console.log('users get', res);
			res.status(200).json(user);
			return;
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The users information could not be retrieved.' });
		});
});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
	let user = req.params.id;
	if (user.id) {
		res.status(200).json({ user });
	} else {
		res.status(400).json({ message: 'invalid user id' });
	}
	next();
}

function validateUser(req, res, next) {
	// let body = req.body
	console.log('validateUser', res);
	if (!req.body) {
		res.status(400).json({ message: 'missing user data' });

	} else if (!req.body.name) {
		res.status(400).json({ message: 'missing required name field' });
		
  }
  next();
}

function validatePost(req, res, next) {}

module.exports = router;
