import {
  listAllUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser,
} from '../controllers/User';

export default function Routes(app) {
  app.route('/users').get(listAllUsers);

  app.route('/user').post(createUser);

  app
    .route('/user/:userId')
    .get(readUser)
    .put(updateUser)
    .delete(deleteUser);
}
