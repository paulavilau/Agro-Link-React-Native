import React, { useEffect, useContext, useState, useRef } from "react";
import { TextInput } from "react-native-paper";
import {
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Ionicons } from "@expo/vector-icons";
import { CartItemsContext } from "../../../services/cartItems/cartItems.context";
import LottieView from "lottie-react-native";

const TitleContainer = styled.View`
  align-items: center;
`;

const CartTitle = styled(Text)`
  font-size: 30px;
`;

const CartItemsContainer = styled(FlatList)`
  flex: 1;
  margin-top: 5px;
`;

const ItemContainer = styled.View`
  padding-left: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: row;
  border-width: 0.5px;
  border-color: #d4d5d6;
`;

const ItemTitleContainer = styled.View`
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  font-size: 20px;
  width: 100px;
`;

const ItemImage = styled(Image)`
  height: 100%;
  width: 50px;
  margin-right: 15px;
`;

const SupplierTitle = styled(Text)`
  font-size: 15px;
  width: 100px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  margin-top: 15px;
`;

const PriceTitle = styled(Text)`
  position: absolute;
  left: 200px;
`;

const Price = styled(Text)`
  margin-top: 30px;
  margin-right: 15px;
`;

const Quantity = styled(TextInput)`
  margin-top: 20px;
  height: 40px;
  width: 55px;
  margin-right: 30px;
`;

const QuantityTitle = styled(Text)`
  left: 247px;
`;

const TotalTitle = styled(Text)`
  left: 270px;
`;

const Total = styled(Text)`
  margin-top: 30px;
  margin-right: 15px;
`;

const PCTContainer = styled.View`
  position: absolute;
  flex-direction: row;
  left: 200px;
`;

const DeleteIconContainer = styled(TouchableOpacity)`
  margin-top: 30px;
`;

const UM = styled(Text)`
  margin: 30px 30px 0px 0px;
`;

const EmptyCartContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const EmptyCartLabel = styled(Text)`
  font-size: 25px;
  margin-bottom: 10px;
`;

const BackToShopContainer = styled.View`
  flex-direction: row;
`;

const BackToShopButton = styled(TouchableOpacity)``;

const BackToShopLabel = styled(Text)`
  font-size: 20px;
  text-decoration: underline;
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;

const screenDimensions = Dimensions.get("screen");

export const CartScreen = ({ navigation }) => {
  const { newCartItems, DeleteCartItem } = useContext(CartItemsContext);
  console.log(newCartItems);

  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        {newCartItems.length > 0 ? (
          <>
            <TitleContainer>
              <CartTitle variant="caption">Coș de cumpărături</CartTitle>
            </TitleContainer>
            <HeaderContainer>
              <PriceTitle>Preț</PriceTitle>
              <QuantityTitle>Cantitate</QuantityTitle>
              <TotalTitle>Total</TotalTitle>
            </HeaderContainer>
            <CartItemsContainer
              data={newCartItems}
              keyExtractor={(newCartItem) => newCartItem.id.toString()}
              renderItem={({ item: newCartItem }) => {
                return (
                  <ItemContainer>
                    <ItemImage source={{ uri: newCartItem.poza }} />
                    <ItemTitleContainer>
                      <ItemTitle>{newCartItem.denumire}</ItemTitle>
                      <SupplierTitle>
                        {newCartItem.producator} - {newCartItem.judet}
                      </SupplierTitle>
                    </ItemTitleContainer>
                    <PCTContainer>
                      <Price>{newCartItem.pret} lei</Price>
                      <Quantity value={newCartItem.cantitate.toString()} />
                      {/* <UM>{newCartItem.um}</UM> */}
                      <Total>
                        {newCartItem.pret * newCartItem.cantitate} lei
                      </Total>
                      <DeleteIconContainer
                        onPress={() => {
                          DeleteCartItem(newCartItem.id);
                        }}
                      >
                        <Ionicons name="md-trash-outline" size={25} />
                      </DeleteIconContainer>
                    </PCTContainer>
                  </ItemContainer>
                );
              }}
            />
          </>
        ) : (
          <EmptyCartContainer>
            <AnimationWrapper>
              <LottieView
                key="animation"
                autoPlay
                loop
                resizeMode="cover"
                source={require("../../../../assets/watermelon.json")}
              />
            </AnimationWrapper>
            <EmptyCartLabel>Cosul de cumparaturi este gol.</EmptyCartLabel>
            <BackToShopContainer>
              <BackToShopButton
                onPress={() => {
                  navigation.navigate("Shop");
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="arrow-back-outline" size={30} />
                  <BackToShopLabel>Inapoi la magazin</BackToShopLabel>
                </View>
              </BackToShopButton>
            </BackToShopContainer>
          </EmptyCartContainer>
        )}
      </View>
    </SafeArea>
  );
};
