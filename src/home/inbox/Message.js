// @flow
/* eslint-disable react-native/no-unused-styles */
import moment from "moment";
import * as React from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import { Svg } from "expo";

import {APIStore, Theme, Text, Avatar} from "../../components";

import type {Message} from "../../components/Model";

type MessageProps = {
    message: Message,
    name: string,
    picture: string
};

export default class ChatMessage extends React.PureComponent<MessageProps> {

    render(): React.Node {
        const {message, name} = this.props;
        const style = message.me ? meStyles : sheStyles;
        return (
            <View style={[styles.container, style.container]}>
                <View style={[styles.message, style.message]}>
                    <Text style={style.text} gutterBottom>{message.message}</Text>
                    <Text type="small" style={style.author}>
                        {`${moment(message.date, "X").format("DD MMM h:MM")}`}
                    </Text>
                </View>
                <Svg width={Avatar.SIZE / 2} height={Avatar.SIZE / 2} viewBox="0 0 200 200" style={style.svg}>
                    <Svg.Path
                        d="M200,200 L0,200 L0,0 C0,110.45695 89.54305,200 200,200 Z"
                        fill={message.me ? Theme.palette.secondary : gray}
                    />
                </Svg>
                <Avatar uri="http://172.20.10.3:8080/storage/me.png" style={styles.avatar} />
            </View>
        );
    }
}

const {width} = Dimensions.get("window");
const avatarPadding = 4;
const gray = "#f2f2f2";
const styles = StyleSheet.create({
    container: {
        marginLeft: Theme.spacing.base,
        marginRight: Theme.spacing.base,
        marginBottom: Theme.spacing.small,
        alignItems: "flex-end"
    },
    message: {
        padding: Theme.spacing.small,
        borderRadius: 6,
        width: width - (Theme.spacing.base * 2) - Avatar.SIZE - avatarPadding
    },
    avatar: {
        position: "relative",
        left: -(Avatar.SIZE / 2) + avatarPadding,
        bottom: avatarPadding
    }
});

const meStyles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse"
    },
    message: {
        borderBottomRightRadius: 0,
        backgroundColor: Theme.palette.secondary
    },
    svg: {
        // transform: [{ rotate: "270deg" }]
    },
    text: {
        color: "white"
    },
    author: {
        color: "white",
        opacity: 0.5
    }
});

const sheStyles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse"
    },
    message: {
        borderBottomLeftRadius: 0,
        backgroundColor: gray
    },
    svg: {
        transform: [{ rotate: "90deg" }]
    },
    text: {
        color: "#484848"
    },
    author: {
        color: "black",
        opacity: 0.5
    }
});
