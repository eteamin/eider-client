// @flow
import * as React from "react";

import {HomeContainer} from "../Home";

import ThreadItem from "./ThreadItem";

import {Text, APIStore} from "../../components";
import type {ScreenProps} from "../../components/Types";

export default class Inbox extends React.PureComponent<ScreenProps<>> {

    render(): React.Node {
        const {navigation} = this.props;
        const threads = APIStore.threads();
        return (
            <HomeContainer withGutter>
                <Text type="header1" gutterBottom>Inbox</Text>
                <Text gutterBottom>You have no unread messages</Text>
                {
                    threads.map(thread => <ThreadItem key={thread.name} {...{ thread, navigation }} />)
                }
            </HomeContainer>
        );
    }
}
