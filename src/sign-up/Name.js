// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {TextInput, StyleSheet} from "react-native";

import {Text, TextField} from "../components";
import type {NavigationProps} from "../components/Types";

import SignUpContainer from "./SignUpContainer";
import SubmitButton from "./SubmitButton";

export default class Name extends React.Component<NavigationProps<*>> {

    lastName: TextInput;

    @autobind
    setLastNameRef(input: TextInput) {
        this.lastName = input;
    }

    @autobind
    goToLastName() {
        this.lastName.focus();
    }

    @autobind
    next() {
        this.props.navigation.navigate("SignUpEmail");
    }

    render(): React.Node {
        const {navigation} = this.props;
        return (
            <SignUpContainer {...{ navigation }}>
                <Text type="header2" style={styles.text} gutterBottom>What is your name?</Text>
                <TextField
                    label="First Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={this.goToLastName}
                    contrast
                    autoFocus
                />
                <TextField
                    label="Last Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="go"
                    textInputRef={this.setLastNameRef}
                    onSubmitEditing={this.next}
                    contrast
                />
                <SubmitButton onPress={this.next} />
            </SignUpContainer>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: "white"
    }
});
