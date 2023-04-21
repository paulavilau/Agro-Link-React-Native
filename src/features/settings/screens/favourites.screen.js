// import React, { useContext } from "react";
// import { FlatList, TouchableOpacity } from "react-native";

// import { Spacer } from "../../../components/spacer/spacer.component";
// import { SafeArea } from "../../../components/utility/safe-area.component";
// import { Text } from "../../../components/typography/text.component";

// // import { FavouritesContext } from "../../../services/favourites/favourites.context";
// import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
// import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";

// import styled from "styled-components/native";

// const NoFavouritesArea = styled(SafeArea)`
//   align-items: center;
//   justify-content: center;
// `;

// export const FavouritesScreen = ({ navigation }) => {
//   const { favourites } = useContext(FavouritesContext);

//   return favourites.length ? (
//     <SafeArea>
//       <RestaurantList
//         data={favourites}
//         renderItem={({ item }) => {
//           return (
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("RestaurantDetail", {
//                   restaurant: item,
//                 })
//               }
//             >
//               <Spacer position="bottom" size="large">
//                 <RestaurantInfoCard restaurant={item} />
//               </Spacer>
//             </TouchableOpacity>
//           );
//         }}
//         keyExtractor={(item) => item.name}
//         contentContainerStyle={{ padding: 16 }}
//       />
//     </SafeArea>
//   ) : (
//     <NoFavouritesArea>
//       <Text variant="label">You don't have any favourites yet.</Text>
//     </NoFavouritesArea>
//   );
// };
