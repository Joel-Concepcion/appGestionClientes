import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

//firebase
import {
    collection,
    getFirestore,
    query, doc,
    setDoc, getDocs, onSnapshot,
    updateDoc, deleteDoc
} from "firebase/firestore";
import appFirebase from "../db/Firebase";
const db = getFirestore(appFirebase);

//import { deleteDoc } from "firebase/firestore";
import { NumberSchema } from "firebase/vertexai";


export default function ListarClientes({ route, navigation }) {
    const [clientes, setClientes] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState('');

    const obtenerClientes = async () => {
        const querySnapshot = await getDocs(collection(db, "clientes"));
        const listaClientes = querySnapshot.docs.map((doc) => doc.data());
        setClientes(listaClientes);
    };

    useEffect(() => {
        obtenerClientes()
    }, [clientes]);

    const guardarNuevo = async (nuevo) => {
        await setDoc(doc(db, "clientes", nuevo.id), nuevo);
        obtenerClientes();
    };

    const eliminarCliente = async (id) => {
        try {
            const clienteDoc = doc(db, "clientes", id);
            await deleteDoc(clienteDoc);
            console.log(`Cliente con cédula ${id} eliminado correctamente.`);

            setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.id !== id));

        } catch (error) {
            console.error("Error eliminando el cliente:", error);
            Alert.alert("❌ Error", "No se pudo eliminar el cliente. Verifica que el ID es correcto.");
        }
    };

    const actualizarCliente = async (id, nuevoDatos) => {
        try {
            await updateDoc(doc(db, "clientes", id), nuevoDatos);
            obtenerClientes();
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar el cliente");
        }
    };

    const buscarPorCedula = clientes.filter((item) =>
        item.nuevaCedula?.toLowerCase().includes(textoBusqueda.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <View style={styles.Datos}>
            <TouchableOpacity
                style={styles.eli}
                onPress={() =>
                    Alert.alert(
                        "⚠ Confirmar eliminación ⚠",
                        "¿Estás seguro de que deseas eliminar este cliente?",
                        [
                            { text: "Cancelar ❌", style: "cancel" },
                            { text: "Eliminar ✔", onPress: () => eliminarCliente(item.id) }
                        ],
                        { cancelable: true }
                    )
                }
            >
                <Ionicons name="trash-bin-sharp" size={30} color="red" style={styles.basura} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.edi1}
                onPress={() => navigation.navigate("AgregarProducto", {
                    clienteEditar: item,
                    guardarNuevo,
                    actualizarCliente
                })}
            >
                <AntDesign name="edit" size={30} color="green" style={styles.edi} />
            </TouchableOpacity>

            <Text>Cédula: {item.nuevaCedula}</Text>
            <Text>Nombre: {item.nuevoNombre}</Text>
            <Text>Apellidos: {item.nuevosApellidos}</Text>
            <Text>Fecha Nacimiento: {item.nuevaFecha}</Text>
            <Text>Sexo: {item.nuevoSexo}</Text>
        </View>
    );

    // En tu return principal (fuera de renderItem):
    return (
        <View style={styles.container}>

            {/*Icono para registrar un nuevo cliente*/}
            <TouchableOpacity onPress={() => navigation.navigate("AgregarProducto", { guardarNuevo })}>
                <View style={styles.icino}>
                    <Entypo name="add-user" size={30} color="#2980b9" />
                </View>
            </TouchableOpacity>

            {/* Barra de búsqueda */}
            <View style={styles.buscadorContainer}>
                <TextInput
                    style={styles.buscadorInput}
                    placeholder="Buscar por cédula..."
                    value={textoBusqueda}
                    onChangeText={setTextoBusqueda}
                    keyboardType="default"
                    autoCapitalize="characters"
                />
            </View>

            <Text style={styles.titulo}>Lista de Clientes</Text>

            {/* Lista de clientes */}
            {clientes.length === 0 ? (
                <Text style={styles.alert}>No hay clientes registrados</Text>
            ) : buscarPorCedula.length === 0 ? (
                <Text style={styles.alert}>No se encontraron coincidencias</Text>
            ) : (
                <FlatList
                    data={buscarPorCedula}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
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
        marginLeft: 300,
        borderRadius: 10,
        borderWidth: 4,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#2980b9",
        marginBottom: 5,
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
    alert: {
        color: "#3498db",
        fontSize: 25,
    },
    edi: {
        marginTop: 7,
        marginLeft: 3,

    },
    edi1: {
        width: 40,
        height: 40,
        marginTop: -40,
        marginLeft: 240,
    },
    eli: {
        width: 30,
        marginLeft: 300,
    },
    buscadorContainer: {
        marginBottom: 15,
    },
    buscadorInput: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#2980b9',
        fontSize: 16,
    },
});