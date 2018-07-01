import React from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import {
  Container,
  Content,
  Spinner,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Button,
} from 'native-base';
import { retrieveData } from '../lib/tools';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersLoaded: true,
      dataSource: null,
      refreshing: false,
    };
  }

  static navigationOptions = {
    title: 'Todos los Usuarios',
  };

  componentDidMount() {
    retrieveData(apiAddress => {
      this.setState(
        {
          apiAddress,
        },
        () => this.allUsers(),
      );
    });
  }

  allUsers = () => {
    const url = `${this.state.apiAddress}/users`;
    const header = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    this.setState({
      usersLoaded: true,
    });

    return fetch(url, header)
      .then(response => response.json())
      .then(responseJson => {
        setTimeout(() => {
          this.setState(
            {
              usersLoaded: false,
              refreshing: false,
              dataSource: responseJson,
            },
            () => {
              console.log(this.state.dataSource);
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
        {this.state.usersLoaded ? (
          <Container
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Spinner />
          </Container>
        ) : (
          <Content>
            <List
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    this.setState({ refreshing: true });
                    this.allUsers();
                  }}
                />
              }
              dataArray={this.state.dataSource}
              renderRow={data => (
                <ListItem>
                  <Left>
                    <Text>{data.name}</Text>
                  </Left>
                  <Right>
                    <Button
                      transparent
                      dark
                      onPress={() =>
                        this.props.navigation.navigate('Update', {
                          _id: data._id,
                        })
                      }
                    >
                      <Icon style={{ fontSize: 20 }} name="arrow-forward" />
                    </Button>
                  </Right>
                </ListItem>
              )}
            />
          </Content>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
