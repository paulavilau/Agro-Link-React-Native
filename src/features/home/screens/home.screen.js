import React from "react";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { TouchableOpacity, ScrollView } from "react-native";

const HomeContainer = styled.View`
  // align-items: center;
  flex: 1;
  width: 100%;
`;

const HomeTitleContainer = styled.View`
  margin-top: ${(props) => props.theme.sizes[0]};
  width: 100%;
  background-color: #e1f0bd;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const HomeTitle = styled(Text).attrs({})`
  font-family: ${(props) => props.theme.fonts.body};
  margin-left: 15px;
  font-size: 25px;
`;

const HomeSubtitle = styled(Text).attrs({})`
  font-family: ${(props) => props.theme.fonts.body};
  margin-left: 15px;
  font-size: 15px;
`;

const HomeImage1Container = styled.View`
  align-items: center;
  margin-top: ${(props) => props.theme.sizes[0]};
  height: 300px;
`;

const HomeImage1 = styled.Image.attrs({
  source: require("../../../../assets/homeimg1.jpg"),
})`
  border-radius: 5px;
  height: 300px;
  width: 97%;
`;

const HomeImage2Container = styled.View`
  margin-top: 5px;
  align-items: center;
  height: 300px;
`;

const HomeImage2 = styled.Image.attrs({
  source: require("../../../../assets/shop.jpg"),
})`
  border-radius: 5px;
  height: 300px;
  width: 97%;
`;

const HomeImage3Container = styled.View`
  margin-top: 5px;
  align-items: center;
  height: 300px;
`;

const HomeImage3 = styled.Image.attrs({
  source: require("../../../../assets/recipe.jpg"),
})`
  border-radius: 5px;
  height: 300px;
  width: 97%;
`;

const HomeImage4Container = styled.View`
  margin-top: 5px;
  align-items: center;
  height: 300px;
`;

const HomeImage4 = styled.Image.attrs({
  source: require("../../../../assets/exploremap.jpg"),
})`
  border-radius: 5px;
  height: 300px;
  width: 97%;
`;

const ImageCover = styled(TouchableOpacity)`
  position: absolute;
  z-index: 99;
  height: 35px;
  width: 70px;
  background-color: #e1f0bd;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 250px;
`;

const AboutUsButton = styled(TouchableOpacity)`
  position: absolute;
  z-index: 99;
  height: 35px;
  width: 70px;
  background-color: #ddffbb;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 250px;
`;

const BottomContainer = styled.View`
  width: 100%;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const HomeScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <HomeContainer>
        <HomeTitleContainer>
          <HomeTitle variant="label">Online Market</HomeTitle>
          <HomeSubtitle variant="caption">
            Discover bio farmers around your town.
          </HomeSubtitle>
        </HomeTitleContainer>
        <ScrollView>
          <HomeImage1Container>
            <HomeImage1 />
            <AboutUsButton onPress={() => navigation.navigate("AboutUs")}>
              <Text>About us</Text>
            </AboutUsButton>
          </HomeImage1Container>
          <HomeImage2Container>
            <HomeImage2 />
            <AboutUsButton onPress={() => navigation.navigate("Shop")}>
              <Text>Shop</Text>
            </AboutUsButton>
          </HomeImage2Container>
          <HomeImage3Container>
            <HomeImage3 />
            <AboutUsButton onPress={() => navigation.navigate("CookBook")}>
              <Text>CookBook</Text>
            </AboutUsButton>
          </HomeImage3Container>
          <HomeImage4Container>
            <HomeImage4 />
            <AboutUsButton onPress={() => navigation.navigate("Map")}>
              <Text>Explore Map</Text>
            </AboutUsButton>
          </HomeImage4Container>
          <BottomContainer>
            <Text>Since 2023.</Text>
          </BottomContainer>
        </ScrollView>
      </HomeContainer>
    </SafeArea>
  );
};
