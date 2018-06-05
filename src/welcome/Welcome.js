// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet} from "react-native";

import {Theme, Text, Button, Container, NavigationHelpers} from "../components";
import type {ScreenProps} from "../components/Types";

export default class Welcome extends React.Component<ScreenProps<>> {

    @autobind
    login() {
        NavigationHelpers.reset(this.props.navigation, "Home");
    }

    render(): React.Node {
        return (
            <Container style={styles.container} withGutter>
                <Text type="header2" style={styles.header} gutterBottom>Welcome to Eider</Text>
                <Button label="Let's Chat" onPress={this.login} full primary contrast />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        backgroundColor: Theme.palette.secondary
    },
    header: {
        color: "white",
        textAlign: "center"
    }
});
