import React, { useEffect, useState, useContext } from "react";
import { FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import {
  List,
  TouchableRipple,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { CategoriesContext } from "../../../services/categories/categories.context";
import { ClassesContext } from "../../../services/classes/classes.context";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";

const CategoriesTitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  height: 70px;
  width: 100%;
  border-width: 2px;
  border-color: #d9d8d7;
  flex-direction: row;
`;

const CategoriesTitle = styled(Text)`
  font-size: 40px;
  padding-left: 15px;
`;

const CategoriesList = styled(FlatList).attrs({
  contentContainerStyled: {
    padding: 16,
  },
})``;

const CategoriesItem = styled.View`
  width: 100%;
  height: 50px;
  background-color: #e1f0bd;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 80%;
  left: 50%;
`;

const CategoryIcon = styled(Image).attrs({})`
  height: 45px;
  width: 50px;
  border-radius: 25px;
`;

const ListAccView = styled.View`
  width: 100%;
  font-family: ${(props) => props.theme.fonts.body};
  color: black;
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10px;
`;

export const CategoriesScreen = ({ navigation }) => {
  const { classes, isClassesLoading, classesError } = useContext(
    ClassesContext
  );
  const { categories, isCategoriesLoading, categoriesError } = useContext(
    CategoriesContext
  );

  const [expanded, setExpanded] = useState([]);

  const handlePress = () => setExpanded(!expanded);

  return (
    <SafeArea>
      <CategoriesTitleContainer>
        <CategoriesTitle>Categorii produse</CategoriesTitle>
        <SectionEnd>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchProduct")}
          >
            <Ionicons name="search" size="30px" color="grey" />
          </TouchableOpacity>
        </SectionEnd>
      </CategoriesTitleContainer>
      <ScrollView>
        {!isClassesLoading ? (
          classes.map((clasa) => {
            return (
              <ListAccView
                key={clasa.id}
                style={{ width: "100%", backgroudColor: "blue" }}
              >
                <List.Accordion
                  title={clasa.denumire}
                  left={(props) => {
                    return <CategoryIcon source={{ uri: clasa.poza }} />;
                  }}
                  expanded={expanded[clasa.id]}
                  onPress={() => handlePress(clasa.id)}
                  titleStyle={{
                    fontFamily: "Oswald_400Regular",
                    fontSize: 20,
                  }}
                >
                  {categories.map((category) => {
                    return (
                      category.idClasa == clasa.id && (
                        <TouchableOpacity
                          key={category.id}
                          onPress={() =>
                            navigation.navigate("Shop", {
                              idCateg: category.id,
                              denCateg: category.denumire,
                            })
                          }
                        >
                          <List.Item
                            left={(props) => {
                              return (
                                <CategoryIcon source={{ uri: category.poza }} />
                              );
                            }}
                            title={category.denumire}
                            titleStyle={{ fontFamily: "Oswald_400Regular" }}
                          />
                        </TouchableOpacity>
                      )
                    );
                  })}
                </List.Accordion>
              </ListAccView>
            );
          })
        ) : (
          <LoadingContainer>
            <Loading animating={true} size={50} colors={Colors.red} />
          </LoadingContainer>
        )}
      </ScrollView>
    </SafeArea>
  );
};
