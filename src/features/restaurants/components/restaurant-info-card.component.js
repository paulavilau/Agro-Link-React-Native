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
  RestaurantCard,
  RestaurantCardCover,
  Address,
} from "./restaurant-info-card.styles";

/* const Title = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.ui.primary};
`; */

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Proper Pizza & Pasta",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://properpizza.ro/rmvalcea/wp-content/uploads/2020/03/Proper-Pizza-Pasta-Hawaiian-00.jpg",
    ],
    address = "Random Street",
    isOpenNow = true,
    rating = 4.2,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={15}>
      <Favourite restaurant={restaurant} />
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        {/* <Title>{name}</Title> */}
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
