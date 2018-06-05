// @flow
import moment from "moment";
import * as React from "react";
import autobind from "autobind-decorator";
import {
    View, FlatList, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, Platform
} from "react-native";

import Msg from "./Message";

import {NavHeader, Theme, Text, APIStore} from "../../components";
import type {Thread, Message} from "../../components/Model";
import type {ScreenParams} from "../../components/Types";

type ThreadState = {
    message: string,
    messages: Message[]
};

export default class ThreadOverview extends React.Component<ScreenParams<{ thread: Thread }>, ThreadState> {

    state = {
        messages: [],
        message: ""
    };

    static getDerivedStateFromProps(props: ScreenParams<{ thread: Thread }>): $Shape<ThreadState> {
        const {messages} = props.navigation.state.params.thread;
        messages.reverse();
        return { messages };
    }

    @autobind
    send() {
        const {message} = this.state;
        const messages = this.state.messages.slice();
        messages.unshift({
            message,
            me: true,
            date: parseInt(moment().format("X"), 10)
        });
        this.setState({ messages, message: "" });
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {thread} = navigation.state.params;
        const {messages} = this.state;
        const {name} = APIStore.profile();
        return (
            <SafeAreaView style={styles.container}>
                <NavHeader title={thread.name} {...{navigation}} />
                <FlatList
                    inverted
                    data={messages}
                    keyExtractor={message => `${message.date}`}
                    renderItem={({ item }) => (
                        <Msg message={item} name={item.me ? name : thread.name} picture={thread.picture} />
                    )}
                />
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={styles.footer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Write a message"
                            value={this.state.message}
                            onChangeText={message => this.setState({ message })}
                            autoFocus
                            returnKeyType="send"
                            onSubmitEditing={this.send}
                            underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity primary transparent onPress={this.send}>
                            <Text style={styles.btnText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        borderColor: Theme.palette.lightGray,
        borderTopWidth: 1,
        paddingLeft: Theme.spacing.small,
        paddingRight: Theme.spacing.small,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        height: Theme.typography.regular.lineHeight + (Theme.spacing.base * 2),
        flex: 1
    },
    btnText: {
        color: Theme.palette.primary
    }
});
