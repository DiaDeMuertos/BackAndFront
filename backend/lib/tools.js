import bcrypt from 'bcrypt';

export function hashUser(user) {
  const saltRounds = 10;
  const {
    name,
    address,
    telephone,
    zipCode,
    state,
    city,
    login,
    password,
    userType,
  } = user;

  const hash = bcrypt.hashSync(password, saltRounds);

  return {
    name,
    address,
    telephone,
    zipCode,
    state,
    city,
    login,
    password: hash,
    userType,
  };
}

export function updateHashUser(user) {
  const saltRounds = 10;
  const { password } = user;
  const userClone = Object.assign({}, user);

  delete userClone.password;

  const hash = bcrypt.hashSync(password, saltRounds);

  return Object.assign({ password: hash }, userClone);
}
