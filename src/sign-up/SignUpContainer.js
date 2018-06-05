// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, ScrollView, KeyboardAvoidingView} from "react-native";

import {Container, IconButton, Theme} from "../components";
import type {NavigationProps} from "../components/Types";

type SignUpContainerProps = NavigationProps<*> & {
    children?: React.ChildrenArray<React.Element<*>>
};

export default class SignUpContainer extends React.Component<SignUpContainerProps> {

    @autobind
    goBack() {
        this.props.navigation.goBack();
    }

    render(): React.Node {
        return (
            <Container style={styles.container} withGutter>
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView behavior="padding" style={styles.innerContent}>
                        <IconButton
                            name="ios-arrow-back-outline"
                            onPress={this.goBack}
                            contrast
                        />
                        <View>
                            {this.props.children}
                        </View>
                        <View />
                    </KeyboardAvoidingView>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.palette.primary
    },
    content: {
        flexGrow: 1
    },
    innerContent: {
        flexGrow: 1,
        justifyContent: "space-between"
    }
});
