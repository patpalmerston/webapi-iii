const express = require('express');

const db = require('./userDb');
const postDb = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
	const userData = req.body;
	db.insert(userData)
		.then(user => {
			// console.log('users post', user);
			res.status(200).json(user);
		})
		.catch(err => {
			res.status(500).json({
				error: 'There was an error while saving the user to the database'
			});
		});
});
// NOT WORKING
router.post('/:id/posts', validatePost, (req, res) => {
	const postData = req.body;
	db.insert(postData)
		.then(post => {
			console.log('posts post post', post);
			res.status(200).json(post);
		})
		.catch(err => {
			res.status(500).json({
				error: 'There was an error while saving the post to the database'
			});
		});
});

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

router.get('/:id', validateUserId, (req, res) => {
	const { id } = req.params;
	db.getById(id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			res.status(500).json({
				error: 'The user info could not be retrieved.'
			});
		});
});

router.get('/:id/posts', validateUserId, (req, res) => {
	const { id } = req.params;
	db.getUserPosts(id)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(err => {
			res.status(500).json({ error: 'The Post info could not be retrieved' });
		});
});

router.delete('/:id', validateUserId, (req, res) => {
	const { id } = req.params;
	db.remove(id)
		.then(user => {
			if (user) {
				res.status(200).json({ Message: 'User Delete', id });
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'The user could not be removed' });
		});
});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
	let userId = req.params.id;

	db.get(userId).then(user => {
		// console.log('validatUserId', userId);
		if (user === undefined || user.length === 0) {
			res.status(400).json({ message: 'invalid user id' });
		} else {
			req.user = user;
			next();
		}
	});
}

function validateUser(req, res, next) {
	// let body = req.body
	// console.log('validateUser', res);
	if (!req.body) {
		res.status(400).json({ message: 'missing user data' });
		// next();
	} else if (!req.body.name) {
		res.status(400).json({ message: 'missing required name field' });
		// next();
	} else {
		next();
	}
}

function validatePost(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'missing post data' });
	} else if (req.body.text.length === undefined || req.body.text.length === 0) {
		res.status(400).json({ message: 'missing required text field' });
	} else {
		next();
	}
}

module.exports = router;
