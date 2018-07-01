import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Content,
  Spinner,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  Icon,
  Toast,
} from 'native-base';
import { retrieveData } from '../lib/tools';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoaded: true,
      userSaved: false,
      userDeleted: false,
      user: null,
    };
  }

  static navigationOptions = {
    title: 'Actualizar Usuario',
  };

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('_id');

    retrieveData(apiAddress => {
      this.setState({
        apiAddress,
      });

      this.readUser(id);
    });
  }

  readUser = id => {
    const url = `${this.state.apiAddress}/user/${id}`;
    const header = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    this.setState({
      userLoaded: true,
    });

    return fetch(url, header)
      .then(response => response.json())
      .then(responseJson => {
        setTimeout(() => {
          this.setState(
            {
              userLoaded: false,
              user: responseJson,
            },
            () => {
              console.log(this.state.user);
            },
          );
        }, 500);
      })
      .catch(error => {
        console.error(error);
      });
  };

  updateUser = () => {
    const id = this.state.user._id;
    const url = `${this.state.apiAddress}/user/${id}`;
    const header = {
      method: 'PUT',
      body: JSON.stringify(this.state.user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    console.log(header.body);

    this.setState({
      userSaved: true,
    });

    return fetch(url, header)
      .then(response => response.json())
      .then(responseJson => {
        setTimeout(() => {
          this.setState(
            {
              userSaved: false,
              user: responseJson,
            },
            () => {
              console.log(responseJson);
              Toast.show({
                text: 'Usuario Actualizado',
                buttonText: 'OK',
                duration: 3000,
              });
            },
          );
        }, 500);
      })
      .catch(error => {
        console.error(error);
      });
  };

  deleteUser = () => {
    const id = this.state.user._id;
    const url = `${this.state.apiAddress}/user/${id}`;
    const header = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    this.setState({
      userDeleted: true,
    });

    return fetch(url, header)
      .then(response => response.json())
      .then(responseJson => {
        setTimeout(() => {
          this.setState(
            {
              userDeleted: false,
            },
            () => {
              console.log(responseJson);
              Toast.show({
                text: 'Usuario Borrado',
                buttonText: 'OK',
                duration: 3000,
              });
              this.props.navigation.navigate('Create');
            },
          );
        }, 500);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <Container
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        {this.state.userLoaded ||
        this.state.userSaved ||
        this.state.userDeleted ? (
          <Container
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Spinner />
          </Container>
        ) : (
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Nombre</Label>
                <Input
                  value={this.state.user.name}
                  onChangeText={text =>
                    this.setState({ user: { ...this.state.user, name: text } })
                  }
                />
              </Item>
              <Item floatingLabel>
                <Label>Direccion</Label>
                <Input
                  value={this.state.user.address}
                  onChangeText={text =>
                    this.setState({
                      user: { ...this.state.user, address: text },
                    })
                  }
                />
              </Item>
              <Item floatingLabel>
                <Label>Telefono</Label>
                <Input
                  value={this.state.user.telephone}
                  onChangeText={text =>
                    this.setState({
                      user: { ...this.state.user, telephone: text },
                    })
                  }
                />
              </Item>
              <Item floatingLabel>
                <Label>Codigo Postal</Label>
                <Input
                  value={this.state.user.zipCode}
                  onChangeText={text =>
                    this.setState({
                      user: { ...this.state.user, zipCode: text },
                    })
                  }
                />
              </Item>
              <Item floatingLabel>
                <Label>Estado</Label>
                <Input
                  value={this.state.user.state}
                  onChangeText={text =>
                    this.setState({
                      user: { ...this.state.user, state: text },
                    })
                  }
                />
              </Item>
              <Item floatingLabel>
                <Label>Ciudad</Label>
                <Input
                  value={this.state.user.city}
                  onChangeText={text =>
                    this.setState({
                      user: { ...this.state.user, city: text },
                    })
                  }
                />
              </Item>
              <Item floatingLabel>
                <Label>Login</Label>
                <Input
                  value={this.state.user.login}
                  onChangeText={text =>
                    this.setState({
                      user: { ...this.state.user, login: text },
                    })
                  }
                />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  value={this.state.user.password}
                  secureTextEntry={true}
                  onChangeText={text =>
                    this.setState({
                      user: { ...this.state.user, password: text },
                    })
                  }
                />
              </Item>

              <Button
                style={{ marginTop: 10 }}
                iconLeft
                block
                success
                onPress={this.updateUser}
              >
                <Icon type="Entypo" name="save" />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                  Guardar
                </Text>
              </Button>

              <Button
                style={{ marginTop: 10, marginBottom: 10 }}
                iconLeft
                block
                danger
                onPress={this.deleteUser}
              >
                <Icon type="Entypo" name="remove-user" />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Borrar</Text>
              </Button>
            </Form>
          </Content>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
