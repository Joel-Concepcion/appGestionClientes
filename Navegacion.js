import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ListarProductos from './Screens/ListarClientes';
import AgregarProducto from './Screens/GuardarCliente';

const Stack = createStackNavigator();

function StackMenu() {
    return (
        <Stack.Navigator initialRouteName="ListarProductos">
            <Stack.Screen name="ListarProductos" component={ListarProductos}/>
            <Stack.Screen name="AgregarProducto" component={AgregarProducto} />
        </Stack.Navigator>
    );
}

export default function Navegacion() {
    return (
        <NavigationContainer>
            <StackMenu />
        </NavigationContainer>


    );
}