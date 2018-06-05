// @flow
import * as React from "react";

import {HomeContainer} from "../Home";

import ThreadItem from "./ThreadItem";

import {Text, LoadingIndicator} from "../../components";
import type {ScreenProps} from "../../components/Types";


export default class Inbox extends React.PureComponent<ScreenProps<>> {
    state = {
        isConnected: false,
        isLoading: true,
        users: null
    };

    componentDidMount() {
        const ws = new WebSocket("ws://172.20.10.3:8585");
        ws.onopen = () => {
        // connection opened
        ws.send('something'); // send a message
        };

        ws.onmessage = (e) => {
        // a message was received
        console.log(e.data);
        };

        ws.onerror = (e) => {
        // an error occurred
        console.log(e.message);
        };

        ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
        };
        // socket.emit("hello");
    }

    onReceiveMessage(message: string) {
        console.log(message);
        this.state({users: message, loading: false});
    }

    render(): React.Node {
        const {navigation} = this.props;
        if (this.state.isLoading) {
            return (
                <LoadingIndicator />
            );
        }
        return (
            <HomeContainer withGutter>
                <Text type="header1" gutterBottom>Inbox</Text>
                {
                    this.state.users.map(user => <ThreadItem key={user.name} {...{ user, navigation }} />)
                }
            </HomeContainer>
        );
    }
}
