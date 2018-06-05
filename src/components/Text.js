// @flow
import * as React from "react";
import { Text as RNText } from "react-native";

import { Theme } from "./Theme";

import type {BaseProps} from "./Types";

type TypographyProps = BaseProps & {
    type: "header1" | "header2" | "header3" | "large" | "regular" | "small" | "micro",
    numberOfLines?: number,
    gutterBottom?: boolean,
    children: string
};

export default class Text extends React.PureComponent<TypographyProps> {

    static defaultProps = {
        type: "regular"
    };

    render(): React.Node {
        const {type, style, numberOfLines, gutterBottom, children} = this.props;
        const defaultStyle = [Theme.typography[type]];
        const isHeader = type.startsWith("header");
        defaultStyle.push({
            color: "#484848",
            // eslint-disable-next-line no-nested-ternary
            marginBottom: gutterBottom ? (isHeader ? Theme.spacing.base : Theme.spacing.small) : 0
        });
        defaultStyle.push(style);
        return <RNText style={defaultStyle} {...{numberOfLines}}>{children}</RNText>;
    }
}
