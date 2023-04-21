import React, { useContext, useState } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { RestaurantList } from "../components/restaurant-list.styles";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FadeInView } from "../../../components/animations/fade.animations";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
// import { FavouritesContext } from "../../../services/favourites/favourites.context";

import { Search } from "../components/search.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";

import { Text } from "../../../components/typography/text.component";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  // const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading animating={true} size={50} colors={Colors.red} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled &&
        (favourites.length > 0 ? (
          <FavouritesBar
            favourites={favourites}
            onNavigate={navigation.navigate}
          />
        ) : (
          <Spacer position="left" size="large">
            <Text variant="body">You don't have any favorites yet.</Text>
          </Spacer>
        ))}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeArea>
  );
};
