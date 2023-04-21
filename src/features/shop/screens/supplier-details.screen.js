import React, { useState, useEffect } from "react";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import styled from "styled-components/native";
import { Image, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";

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
  justify-content: center;
`;

const Description = styled.Text`
  margin-right: 15px;
  margin-top: 15px;
  font-family: "Oswald_400Regular";
`;

const CheckoutContainer = styled.View`
  margin-left: 15px;
  margin-top: 15px;
`;

const QuantityInput = styled(TextInput)`
  width: 100px;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
`;

const QuantityLabel = styled(Text)`
  flex-direction: row;
  padding-top: 15px;
  margin-left: 5px;
  font-size: 20px;
`;

const AddButton = styled(TouchableOpacity)`
  margin-left: 15px;
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

export const SupplierDetailsScreen = ({ route }) => {
  const { producator } = route.params;

  return (
    <SafeArea>
      <ScrollView>
        <ProductImageContainer>
          <ProductImage source={{ uri: producator.poza }} />
        </ProductImageContainer>
        <TitleContainer>
          <Title>{producator.nume}</Title>
        </TitleContainer>
        <ProductDetailsContainer>
          <ProductPrice>
            {producator.localitate},{producator.judet}
          </ProductPrice>
          <DescriptionContainer>
            {/* <Description>{producator.descriere}</Description> */}
          </DescriptionContainer>
        </ProductDetailsContainer>
      </ScrollView>
    </SafeArea>
  );
};
