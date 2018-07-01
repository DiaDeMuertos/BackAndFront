import User from '../models/User';
import { hashUser, updateHashUser } from '../lib/tools';

export function createUser(req, res) {
  const newUser = new User(hashUser(req.body));

  newUser.save((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
}

export function readUser(req, res) {
  User.findById(req.params.userId)
    .exec()
    .then(user => res.json(user))
    .catch(err => res.send(err));
}

export function listAllUsers(req, res) {
  User.find({})
    .exec()
    .then(user => res.json(user))
    .catch(err => res.send(err));
}

export function updateUser(req, res) {
  const body = req.body.password ? updateHashUser(req.body) : req.body;

  User.findOneAndUpdate({ _id: req.params.userId }, body, { new: true })
    .exec()
    .then(user => res.json(user))
    .catch(err => res.send(err));
}

export function deleteUser(req, res) {
  User.remove({
    _id: req.params.userId,
  })
    .exec()
    .then(() => {
      res.json({ message: 'user successfully deleted' });
    })
    .catch(err => res.send(err));
}
