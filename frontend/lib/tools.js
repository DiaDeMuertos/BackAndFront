import faker from 'faker';
import { AsyncStorage } from 'react-native';

export const userGenerator = () => {
  return {
    name: faker.name.findName().toLowerCase(),
    address: `${faker.address.streetName()} ${faker.address.streetAddress()}`.toLowerCase(),
    telephone: faker.phone.phoneNumber(),
    zipCode: faker.address.zipCode().toLowerCase(),
    state: 'sonora',
    city: 'hermosillo',
    login: faker.name.firstName().toLowerCase(),
    password: faker.lorem.word().toLowerCase(),
    userType: 'typeA',
  };
};

export const storeData = async apiAddress => {
  try {
    await AsyncStorage.setItem('apiAddress', apiAddress);
  } catch (err) {
    console.log(err);
  }
};

export const retrieveData = async cb => {
  try {
    const value = await AsyncStorage.getItem('apiAddress');
    if (value !== null) {
      console.log(value);
      return cb(value);
    }
  } catch (err) {
    console.log(err);
  }
};
//
