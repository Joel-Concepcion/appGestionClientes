import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useState } from 'react';

import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ListarClientes({ route, navigation }) {

    const [clientes, setClientes] = useState([
        {
            nuevaCedula: "603-092464-1000M",
            nuevoNombre: "Mateo",
            nuevosApellidos: "Tellez Davila",
            nuevaFecha: "1964-09-24",
            nuevoSexo: "Masculino",
        },
        {
            nuevaCedula: "603-060884-1000G",
            nuevoNombre: "Medarda",
            nuevosApellidos: "Garcia Brenes",
            nuevaFecha: "1983-06-08",
            nuevoSexo: "Femenino",
        },
    ]);

    const guardarNuevo = (nuevo) => {
        setClientes([...clientes, nuevo]);
    };

    const eliminarCliente = (index) => {
        setClientes(clientes.filter((_, i) => i !== index));
    };


    return (
        <View style={styles.container}>
            {/*Icono para registrar un nuevo cliente*/}
            <TouchableOpacity onPress={() => navigation.navigate("AgregarProducto", { guardarNuevo })}>
                <View style={styles.icino}>
                    <Entypo name="add-user" size={30} color="#2980b9" />
                </View>
            </TouchableOpacity>

            {/*Se muestra la lista de los clientes*/}
            <Text style={styles.titulo}>Lista de Clientes</Text>


            {clientes.length === 0 ? (
                // en este punto le quise agregar esos emojis para 
                // que se viera mas bonito XD
                <Text style={styles.alert}>No hay registro...❗😥😥😥❗</Text>
            ) : (
                <FlatList
                    data={clientes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.Datos}>
                            <TouchableOpacity
                                onPress={() =>
                                    Alert.alert(
                                        // en este punto le quise agregar esos emojis para 
                                        // que se viera mas bonito XD
                                        "⚠ Confirmar eliminación ⚠",
                                        "¿Estás seguro de que deseas eliminar este cliente?",
                                        [
                                            { text: "Cancelar ❌", style: "cancel" },
                                            { text: "Eliminar ✔", onPress: () => eliminarCliente(index) }
                                        ],
                                        { cancelable: true }
                                    )
                                }
                            >
                                <Ionicons name="trash-bin-sharp" size={30} color="red" style={styles.basura} />
                            </TouchableOpacity>

                            <Text>Cédula: {item.nuevaCedula}</Text>
                            <Text>Nombre: {item.nuevoNombre}</Text>
                            <Text>Apellidos: {item.nuevosApellidos}</Text>
                            <Text>Fecha Nacimiento: {item.nuevaFecha}</Text>
                            <Text>Sexo: {item.nuevoSexo}</Text>
                        </View>
                    )}
                />
            )}
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#d6eaf8",
    },
    icino: {
        marginTop: 1,
        marginLeft: 300,
        borderRadius: 10,
        borderWidth: 4,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#2980b9",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#3498db",
        marginBottom: 10,
        textAlign: "center",
    },
    Datos: {
        backgroundColor: "#85c1e9",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginBottom: 5,
        marginTop: 5,
    },
    basura: {
        marginLeft: 300,
    },
    alert: {
        color: "#3498db",
        fontSize: 25,
    }
});