// @flow
import * as React from "react";

import {HomeContainer} from "../Home";

import ThreadItem from "./ThreadItem";

import {Text, LoadingIndicator} from "../../components";
import type {ScreenProps} from "../../components/Types";

const io = require("socket.io-client");

export default class Inbox extends React.PureComponent<ScreenProps<>> {
    state = {
        isConnected: false,
        isLoading: true,
        users: null
    };
    componentDidMount() {

        const socket = io("", {
            transports: ["websocket"]
        });
        socket.on("connect", () => {
            this.setState({ isConnected: true });
        });
        const payload = {operation: "get_all_users"};
        this.socket.on("message", this.onReceiveMessage);
        this.socket.emit(payload);
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
