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
        const lastMessage = _.last(thread.messages);
        const lastActivity = moment(lastMessage.date, "X").format("DD MMM YYYY");
        return (
            <TouchableWithoutFeedback onPress={this.openThread}>
                <View>
                    <View style={styles.container}>
                        <Avatar uri={thread.picture} />
                        <View style={styles.overview}>
                            <View style={styles.header}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.name}
                                >
                                    {thread.name}
                                </Text>
                                <Text type="small" numberOfLines={1}>
                                    {lastActivity}
                                </Text>
                            </View>
                            <Text numberOfLines={1}>
                                {lastMessage.message}
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
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: Theme.spacing.tiny,
        marginBottom: Theme.spacing.tiny,
        borderBottomWidth: 1,
        borderColor: Theme.palette.lightGray
    },
    overview: {
        flexShrink: 1,
        marginLeft: Theme.spacing.tiny
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Theme.spacing.tiny
    },
    name: {
        fontFamily: Theme.typography.semibold
    }
});
