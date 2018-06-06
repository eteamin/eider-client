// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import * as _ from "lodash";
import moment from "moment";
import {StyleSheet, View, TouchableWithoutFeedback} from "react-native";

import {Avatar, Text, Theme} from "../../components";

import type {Thread} from "../../components/Model";
import type {NavigationProps} from "../../components/Types";

type ThreadItemProps = NavigationProps<*> & {
    thread: Thread
};

export default class ThreadItem extends React.Component<ThreadItemProps> {

    @autobind
    openThread() {
        const {navigation, thread} = this.props;
        navigation.navigate("Thread", { thread });
    }

    render(): React.Node {
        const {thread} = this.props;

        return (
            <TouchableWithoutFeedback onPress={this.openThread}>
                <View>
                    <View style={styles.container}>
                        <Avatar uri="http://172.20.10.3:8080/storage/me.png" />
                        <View style={styles.overview}>
                            <View style={styles.header}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.name}
                                >
                                    {"Me"}
                                </Text>
                                {/*<Text type="small" numberOfLines={1}>*/}
                                    {/*{lastActivity}*/}
                                {/*</Text>*/}
                            </View>
                            <Text numberOfLines={1}>
                                {"No messages yet!"}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        alignItems: "center",
        paddingBottom: Theme.spacing.tiny,
        marginBottom: Theme.spacing.tiny,
        borderBottomWidth: 1,
        borderColor: Theme.palette.lightGray
    },
    overview: {
        flexShrink: 1,
        marginRight: Theme.spacing.tiny
    },
    header: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        marginBottom: Theme.spacing.tiny
    },
    name: {
        fontFamily: Theme.typography.semibold
    }
});
