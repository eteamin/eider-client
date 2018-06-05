// @flow
/* eslint-disable no-nested-ternary */
import * as React from "react";
import {StyleSheet, Animated} from "react-native";
import {Button} from "native-base";
import {Ionicons as Icon} from "@expo/vector-icons";
import type {StyleObj} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

import {Theme} from "./Theme";
import type {BaseProps} from "./Types";

type IconButtonProps = BaseProps & {
    name: string,
    contrast?: boolean,
    onPress: () => void,
    withBackground?: boolean,
    iconStyle?: StyleObj,
    animated?: boolean
};

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class IconButton extends React.PureComponent<IconButtonProps> {

    render(): React.Node {
        const {name, onPress, withBackground, contrast, style, iconStyle, animated} = this.props;
        const IconComp = animated ? AnimatedIcon : Icon;
        const btnStyle = [style, styles.btnBase];
        if (withBackground) {
            btnStyle.push(styles.btnWithBackground);
        }
        return (
            <Button {...{ onPress }} style={btnStyle} transparent>
                <IconComp
                    size={25}
                    color={withBackground ? Theme.palette.primary : (contrast ? "white" : Theme.typography.color)}
                    style={iconStyle}
                    {...{ name }}
                />
            </Button>
        );
    }
}

const styles = StyleSheet.create({
    btnBase: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        height: 50,
        width: 50,
        borderRadius: 25
    },
    btnWithBackground: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    }
});
