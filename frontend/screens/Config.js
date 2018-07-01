import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Label, Button, Text } from 'native-base';

import { storeData, retrieveData } from '../lib/tools';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      da: '192',
      db: '168',
      dc: '0',
      dd: '120',
    };
  }

  static navigationOptions = {
    title: 'Configuracion',
  };

  buildApiAddress = () => {
    const { da, db, dc, dd } = this.state;
    return `http://${da}.${db}.${dc}.${dd}:3000`;
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
        <Form style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Label style={{ fontSize: 25 }}>API ADDRESS</Label>
        </Form>

        <Form
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Item style={{ flex: 1 }}>
            <Input
              style={{ fontSize: 25 }}
              value={this.state.da}
              keyboardType="numeric"
              onChangeText={text => this.setState({ da: text })}
            />
          </Item>
          <Item style={{ flex: 1 }}>
            <Input
              style={{ fontSize: 25 }}
              value={this.state.db}
              keyboardType="numeric"
              onChangeText={text => this.setState({ db: text })}
            />
          </Item>
          <Item style={{ flex: 1 }}>
            <Input
              style={{ fontSize: 25 }}
              value={this.state.dc}
              keyboardType="numeric"
              onChangeText={text => this.setState({ dc: text })}
            />
          </Item>
          <Item style={{ flex: 1 }}>
            <Input
              style={{ fontSize: 25 }}
              value={this.state.dd}
              keyboardType="numeric"
              onChangeText={text => this.setState({ dd: text })}
            />
          </Item>
        </Form>
        <Button
          style={{ marginTop: 10 }}
          block
          success
          onPress={() => {
            storeData(this.buildApiAddress());
            this.props.navigation.navigate('Create');
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Aceptar</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
