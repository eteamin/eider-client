// @flow
/* eslint-disable  no-nested-ternary */
import * as React from "react";
import {StyleSheet} from "react-native";
import {Button as NBButton, Text} from "native-base";

import { Theme } from "./Theme";

import type {BaseProps} from "./Types";

type ButtonProps = BaseProps & {
    label: string,
    primary?: boolean,
    full?: boolean,
    contrast?: boolean,
    onPress: () => void
};

export default class Button extends React.PureComponent<ButtonProps> {
    render(): React.Node {
        const {label, full, primary, contrast, onPress, style} = this.props;
        const rounded = contrast;
        const transparent = contrast && !primary;
        const bordered = contrast && !primary;
        const baseStyle = [
            style,
            styles.base,
            contrast && primary ? styles.primaryContrast : (contrast ? styles.contrast : {})
        ];
        if (full) {
            baseStyle.push(styles.full);
        }
        if (rounded) {
            baseStyle.push(styles.rounded);
        }
        const textStyle = contrast && primary ? styles.primaryContrastText : ({});
        return (
            <NBButton {...{ primary, transparent, bordered, style: baseStyle, onPress }}>
                <Text style={[styles.text, textStyle]}>{label}</Text>
            </NBButton>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        marginBottom: Theme.spacing.base,
        justifyContent: "center",
        alignItems: "center"
    },
    rounded: {
        borderRadius: 20
    },
    full: {
        alignSelf: "stretch"
    },
    contrast: {
        borderColor: "white"
    },
    primaryContrast: {
        backgroundColor: "white"
    },
    primaryContrastText: {
        color: Theme.palette.primary
    },
    text: {
        textAlign: "center"
    }
});
