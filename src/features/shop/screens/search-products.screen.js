import React, { useEffect, useState, useContext } from "react";
import { FlatList, View, Image, TouchableOpacity, Button } from "react-native";
import styled from "styled-components/native";
import { Card, Searchbar } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const ProductsList = styled(FlatList).attrs({
  contentContainerStyled: {
    padding: 16,
  },
})``;

const ProductsContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
`;
const SearchContainer = styled.View`
  margin-top: 2px;
  margin-bottom: 1px;
`;

// const ProductCard = styled(Card)`
//   // flex: 1;
//   // margin-bottom: 15px;
//   // border-radius: 15px;
//   height: 100px;
//   width: 150px;
//   // position: relative;

const ProductCard = styled(Card)`
  // margin-bottom: 15px;
  // border-radius: 15px;
  height: 240px;
  width: 50%;
  align-items: center;
  border-radius: 0px;
  border-width: 0.3px;
  border-color: #e6e6e6;
  elevation: 0;
`;

// const ProductImage = styled(Card.Cover)`
//   background-color: ${(props) => props.theme.colors.bg.primary};
//   margin-top: 15px;
//   margin-left: 15px;
//   margin-right: 15px;
//   resize-mode: stretch;
//   border-radius: 15px;
// `;

const ProductImage = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  resize-mode: stretch;
  //border-radius: 5px;
  height: 100px;
  width: 170px;
`;

const DetailsButton = styled(TouchableOpacity)`
  // background-color: #e6e6e6;
  color: white;
  padding-top: 3px;
  height: 35px;
  width: 65px;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  border-radius: 5px;
`;

const BottomSection = styled(View)`
  align-items: center;
  margin-bottom: 15px;
`;

const CategoriesTitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  border-width: 2px;
  border-color: #d9d8d7;
  flex-direction: row;
  background-color: white;
`;

const CategoriesTitle = styled(Text)`
  font-size: 30px;
  padding-left: 15px;
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10px;
`;

export const SearchScreen = () => {
  const [prods, setProds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchUrl, setSearchUrl] = useState("");
  const [url, setUrl] = useState("");

  const { baseUrl } = useContext(AuthenticationContext);

  useEffect(() => {
    const baseUrl = `${baseUrl}products`;

    if (searchUrl == "") {
      setUrl(`${baseUrl}${searchUrl}`);
    } else {
      setUrl(`${baseUrl}${searchUrl}`);
    }
    fetch(url, {
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setProds(data._embedded.products);
        // console.log(data._embedded.products);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [searchUrl, url]);

  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar
          placeholder="Search for a product"
          onChangeText={(searchedText) => {
            setSearchUrl(
              `/search/findByDenumireContaining?denumire=${searchedText}`
            );
            // prods.filter((prod) => {
            //   return (prod.denumire = searchedText);
            // });
          }}
        />
      </SearchContainer>

      <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>
        {prods.length} search result(s)
      </Text>
      {/* <CategoriesTitleContainer>
        <CategoriesTitle>Filtre</CategoriesTitle>
        <SectionEnd>
          <TouchableOpacity>
            <Ionicons name="filter" size="30px" color="grey" />
          </TouchableOpacity>
        </SectionEnd>
      </CategoriesTitleContainer> */}
      <ScrollView>
        <ProductsContainer>
          {/* <ProductsList
          // data={prods.filter((prod) => {
          //   return prod.idCategorie == idCateg;
          // })}
          data={prods}
          renderItem={({ item }) => {
            return (
              <ProductCard>
                <TouchableOpacity>
                  <Card.Title
                    title={item.denumire + (item.um ? ` - ${item.um}` : "")}
                  />
                  <Card.Content>
                  <Text>{item.price} lei / {item.um}</Text>
                </Card.Content>
                  <ProductImage
                    source={require("../../../../assets/rosie.jpg")}
                  />
                  <BottomSection>
                    <DetailsButton>
                      <Text variant="label">Detalii</Text>
                    </DetailsButton>
                  </BottomSection>
                </TouchableOpacity>
              </ProductCard>
            );
          }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
        /> */}
          {prods.map((prod) => {
            return (
              <ProductCard>
                <TouchableOpacity>
                  <Card.Title title={prod.denumire} />
                  <Card.Content>
                    <Text>
                      {prod.pret} lei / {prod.um}
                    </Text>
                  </Card.Content>
                  <ProductImage
                    // source={require("../../../../assets/rosie.jpg")}
                    source={{ uri: prod.poza }}
                  />
                  <BottomSection>
                    <DetailsButton>
                      <Text variant="label">Detalii</Text>
                    </DetailsButton>
                  </BottomSection>
                </TouchableOpacity>
              </ProductCard>
            );
          })}
        </ProductsContainer>
      </ScrollView>
    </SafeArea>
  );
};
