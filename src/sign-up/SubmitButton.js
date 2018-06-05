// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {IconButton, Theme} from "../components";

interface SubmitButtonProps {
    onPress: () => void
}

export default class SubmitButton extends React.PureComponent<SubmitButtonProps> {
    render(): React.Node {
        const {onPress} = this.props;
        return (
            <View style={styles.submit}>
                <IconButton
                    name="ios-arrow-forward-outline"
                    contrast
                    withBackground
                    {...{ onPress }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    submit: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingBottom: 50 + Theme.spacing.small
    }
});
