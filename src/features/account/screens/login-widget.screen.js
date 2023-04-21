import { useOktaAuth } from "@okta/okta-react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("Sign in error: ", err);
  };

  if (!authState) {
    return <Loading animating={true} size={50} colors={Colors.red} />;
  }

  return authState.isAuthenticated;
};
