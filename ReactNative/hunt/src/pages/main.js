import React, { Component } from 'react';
import api from '../services/api';

import { View, Text } from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "JSHunt"
    };

    state = {
        counter: 0,
        docs: [],
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get('/products');

        const { docs } = response.data;

        this.setState({ counter: docs.length, docs });
    };
    
    render() {
        return (
            <View>
                <Text>Página Main: {this.state.counter}</Text>
                {this.state.docs.map(product => (
                     <Text key={product._id}>{product.title}</Text>
                ))}
            </View>
        );
    }
}