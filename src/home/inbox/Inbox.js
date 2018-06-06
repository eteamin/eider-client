// @flow
import * as React from "react";

import {HomeContainer} from "../Home";

import ThreadItem from "./ThreadItem";

import WebSocketController from "../../components/WebSocket";
import {Text, LoadingIndicator} from "../../components";
import type {ScreenProps} from "../../components/Types";


export default class Inbox extends React.PureComponent<ScreenProps<>> {
    constructor() {
        super();

        this.state = {
            isLoading: true,
            users: null
        };
        const conn = new WebSocketController();
        this.socket = conn.ws;
    }

    messageReceived(e) {
        console.log(JSON.parse(e.data).users);
        this.setState({users: JSON.parse(e.data).users, isLoading: false});
    }

    componentDidMount() {
        this.socket.onopen = () => this.socket.send(JSON.stringify({operation: "get_all_users", payload: null}));
        this.socket.onmessage = this.messageReceived.bind(this);
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
                <Text type="header1" gutterBottom>People</Text>
                {
                    this.state.users.map(thread => <ThreadItem key={thread} {...{ thread, navigation }} />)
                }
            </HomeContainer>
        );
    }
}
