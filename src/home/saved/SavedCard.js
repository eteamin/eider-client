// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback} from "react-native";

import {Theme, Text} from "../../components";
import type {NavigationProps} from "../../components/Types";

type SavedCardProps = NavigationProps<*> & {
    label: string,
    image: number
};

export default class SavedCard extends React.Component<SavedCardProps> {

    @autobind
    saved() {
        this.props.navigation.navigate("SavedHomes");
    }

    render(): React.Node {
        const {label, image} = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.saved}>
                <View style={styles.container}>
                    <Text type="header2" gutterBottom>{label}</Text>
                    <Image source={image} style={styles.image} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const width = Dimensions.get("window").width - (Theme.spacing.base * 2);
const styles = StyleSheet.create({
    container: {
        marginBottom: Theme.spacing.base
    },
    image: {
        width,
        height: width / 1.5
    }
});
