import React, { useState, useEffect, useContext } from "react";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import styled from "styled-components/native";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { CartItemsContext } from "../../../services/cartItems/cartItems.context";
import { Spacer } from "../../../components/spacer/spacer.component";

const TitleContainer = styled.View`
  margin-left: 15px;
`;

const Title = styled(Text)`
  font-family: "Oswald_400Regular";
  font-size: 50px;
`;

const ProductImageContainer = styled.View`
  margin-left: 15px;
`;

const ProductImage = styled(Image)`
  height: 300px;
  width: 350px;
`;

const ProductDetailsContainer = styled.View`
  //   margin-top: 15px;
  margin-left: 15px;
`;

const ProductPrice = styled(Text)`
  font-size: 25px;
`;

const DescriptionContainer = styled.View`
  margin-top: 15px;
  justify-content: center;
`;

const Description = styled.Text`
  margin-right: 15px;
  margin-top: 15px;
  font-family: "Oswald_400Regular";
`;

const CheckoutContainer = styled.View`
  margin-top: 15px;
`;

const QuantityInput = styled(TextInput)`
  width: 100px;
  height: 50px;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
`;

const QuantityLabel = styled(Text)`
  margin-left: 5px;
  flex-direction: row;
  padding-top: 15px;
  font-size: 20px;
`;

const AddButton = styled(TouchableOpacity)`
  margin-top: 20px;
  font-size: 30px;
  border: 2px grey;
  width: 185px;
  border-radius: 20px;
  padding-bottom: 2px;
`;

const AddLabel = styled(Text)`
  margin-left: 15px;
  font-size: 30px;
`;

const Supplier = styled(Text)`
  font-size: 20px;
  text-decoration: underline;
`;

const DescriptionLabel = styled(Text)`
  font-size: 25px;
  text-decoration: underline;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

export const ProductDetailsScreen = ({ route, navigation }) => {
  const { produs } = route.params;
  const { baseUrl, user } = useContext(AuthenticationContext);
  const { setCartItems, cartItems } = useContext(CartItemsContext);

  const [supplier, setSupplier] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [quantity, setQuantity] = useState(0);

  // const addToCart2 = async (idProdus) => {
  //   const addToCartUrl = `${baseUrl}carts/secure/cart?idClient=${user.uid}`;
  //   const requestOptions = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const firstResponse = await fetch(addToCartUrl, requestOptions);
  //   if (!addToCartResponse.error) {
  //     throw new Error("Something went wrong");
  //   }
  //   console.log(addToCartResponse.json());

  //   const addItemToCartUrl = `${baseUrl}products/secure/cartItems?idCos=${addToCartResponse.id}&idProdus=${idProdus}&cantitate=1`;
  //   const addItemToCartResponse = await fetch(addItemToCartUrl, requestOptions);
  //   if (!addItemToCartResponse.ok) {
  //     throw new Error("Something went wrong");
  //   }
  // };

  const addToCart = async (idProdus, cantitate) => {
    try {
      const addToCartUrl = `${baseUrl}carts/secure/cart?idClient=${user.uid}`;
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const firstResponse = await fetch(addToCartUrl, requestOptions);
      const firstData = await firstResponse.json();
      const idCos = firstData.id;

      const addItemToCartUrl = `${baseUrl}products/secure/cartItems?idCos=${idCos}&idProdus=${idProdus}&cantitate=${cantitate}`;
      const secondResponse = await fetch(addItemToCartUrl, requestOptions);
      const secondData = await secondResponse.json();
      if (secondData.id != null) {
        setCartItems([...cartItems, secondData]);
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const url = `${baseUrl}suppliers/${produs.idProducator}`;
  useEffect(() => {
    fetch(url, {
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setSupplier(data);
        // console.log(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  return (
    <SafeArea>
      <ScrollView>
        <ProductImageContainer>
          <ProductImage source={{ uri: produs.poza }} />
        </ProductImageContainer>
        <TitleContainer>
          <Title>{produs.denumire}</Title>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SupplierDetails", { producator: supplier })
            }
          >
            <Supplier>
              {supplier.nume}, {supplier.judet}
            </Supplier>
          </TouchableOpacity>
        </TitleContainer>
        <ProductDetailsContainer>
          <ProductPrice>
            {produs.pret} lei / {produs.um}
          </ProductPrice>
          <CheckoutContainer>
            {/* <QuantityLabel>Cantitate:</QuantityLabel> */}
            <QuantityContainer>
              <QuantityInput
                placeholder="Cantitate"
                onChangeText={(text) => setQuantity(text)}
              />
              <QuantityLabel>kg</QuantityLabel>
            </QuantityContainer>
          </CheckoutContainer>
          <AddButton onPress={() => addToCart(produs.id, quantity)}>
            <AddLabel>Adauga in cos</AddLabel>
          </AddButton>
          <DescriptionContainer>
            <TouchableOpacity onPress={() => setIsToggled(!isToggled)}>
              <DescriptionLabel>Detalii produs</DescriptionLabel>
            </TouchableOpacity>
            {isToggled && <Description>{produs.descriere}</Description>}
          </DescriptionContainer>
        </ProductDetailsContainer>
        <ModalContainer>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <ModalContainer>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Produs adăugat în coș !</Text>
                <View style={{ flexDirection: "column" }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>
                      Continuați cumpărăturile
                    </Text>
                  </Pressable>
                  <Spacer size="large" position="top">
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        navigation.navigate("Cart");
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>Vizualizare coș</Text>
                    </Pressable>
                  </Spacer>
                </View>
              </View>
            </ModalContainer>
          </Modal>
        </ModalContainer>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 200,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "tomato",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});
