// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet} from "react-native";

import {Theme, Text, Button, Container} from "../components";
import type {ScreenProps} from "../components/Types";

export default class Welcome extends React.Component<ScreenProps<>> {

    @autobind
    signUp() {
        this.props.navigation.navigate("SignUp");
    }

    @autobind
    login() {
        this.props.navigation.navigate("Login");
    }

    render(): React.Node {
        return (
            <Container style={styles.container} withGutter>
                <Text type="header2" style={styles.header} gutterBottom>Welcome to Ting</Text>
                <Button label="Login" onPress={this.login} full primary contrast />
                <Button label="Sign Up" onPress={this.signUp} full contrast />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        backgroundColor: Theme.palette.primary
    },
    header: {
        color: "white"
    }
});
