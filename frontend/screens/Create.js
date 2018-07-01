import React from 'react';
import { StyleSheet } from 'react-native';
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
import { userGenerator, retrieveData } from '../lib/tools';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userAdded: false,
      loadingStoreData: true,
    };
  }

  static navigationOptions = {
    title: 'Crear Usuario',
  };

  componentDidMount() {
    retrieveData(apiAddress => {
      this.setState({
        apiAddress,
      });
      this.setState({ user: { ...userGenerator() }, loadingStoreData: false });
      console.log(this.state);
    });
  }

  generate = () => {
    this.setState({
      user: { ...userGenerator() },
    });
  };

  createUser = () => {
    const url = `${this.state.apiAddress}/user`;
    const header = {
      method: 'POST',
      body: JSON.stringify(this.state.user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    console.log(header.body);

    this.setState({
      userAdded: true,
    });

    return fetch(url, header)
      .then(response => response.json())
      .then(responseJson => {
        setTimeout(() => {
          this.setState(
            {
              userAdded: false,
              user: { ...userGenerator() },
            },
            () => {
              console.log(responseJson);
              Toast.show({
                text: 'Usuario Creado',
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

  render() {
    return (
      <Container
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: 15,
        }}
      >
        {this.state.userAdded || this.state.loadingStoreData ? (
          <Spinner />
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
                onPress={this.createUser}
              >
                <Icon type="Entypo" name="add-user" />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Añadir</Text>
              </Button>

              <Button
                style={{ marginTop: 10 }}
                iconLeft
                bordered
                block
                success
                onPress={() => this.props.navigation.navigate('All')}
              >
                <Icon type="Entypo" name="users" />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                  Usuarios
                </Text>
              </Button>

              <Button
                style={{ marginTop: 10 }}
                iconLeft
                bordered
                block
                success
                onPress={this.generate}
              >
                <Icon type="FontAwesome" name="random" />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                  Generar
                </Text>
              </Button>
            </Form>
          </Content>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
