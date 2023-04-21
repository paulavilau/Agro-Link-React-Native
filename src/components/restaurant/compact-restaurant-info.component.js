import React from "react";
import styled from "styled-components/native";
import { Text } from "../typography/text.component";
import WebView from "react-native-webview";
import { Platform } from "react-native";
import { Spacer } from "../spacer/spacer.component";

const CompactImage = styled.Image`
  border-radius: 5px;
  width: 120px;
  height: 100px;
`;

const CompactWebView = styled(WebView)`
  border-radius: 5px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 5px;
  max-width: 200px;
  align-items: center;
`;

const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({ restaurant, isMap }) => {
  const Image = isAndroid && isMap ? CompactWebView : CompactImage;

  return (
    <Item>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Spacer position="bottom" size="medium" />
      <Text center variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
      <Spacer position="bottom" size="medium" />
      {/*       <Text variant="caption" numberOfLines={3}>
        {restaurant.address}
      </Text> */}
    </Item>
  );
};
