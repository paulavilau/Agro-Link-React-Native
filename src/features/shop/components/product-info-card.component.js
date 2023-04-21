import React from "react";
import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import star from "../../../../assets/star";
import open from "../../../../assets/open";

import { Favourite } from "../../../components/favourites/favourites.component";

import {
  Icon,
  Info,
  Rating,
  Section,
  SectionEnd,
  ProductCard,
  ProductCardCover,
  Address,
} from "./product-info-card.styles";

/* const Title = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.ui.primary};
`; */

export const ProductInfoCard = ({ product = {} }) => {
  const { name = "Rosii", price = 0, um = "", picture = "" } = product;

  return (
    <ProductCard elevation={15}>
      <Favourite restaurant={product} />
      <ProductCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        {/* <Title>{name}</Title> */}
        <Text variant="label">{}</Text>
        <Address>{um}</Address>
      </Info>
    </ProductCard>
  );
};
