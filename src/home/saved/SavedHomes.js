// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, ScrollView} from "react-native";

import HomeCard from "../explore/HomeCard";

import {Text, Container, IconButton, Button, APIStore} from "../../components";
import type {ScreenProps} from "../../components/Types";
import type {Home} from "../../components/Model";

type SavedState = {
    homes: Home[]
};

export default class SavedHomes extends React.Component<ScreenProps<>, SavedState> {

    listener: Home[] => void;

    state = {
        homes: []
    };

    @autobind
    back() {
        this.props.navigation.goBack();
    }

    @autobind
    explore() {
        this.props.navigation.navigate("Explore");
    }

    @autobind
    homeDetails(id: string) {
        this.props.navigation.navigate("HomeOverview", { id });
    }

    componentDidMount() {
        this.listener = (homes: Home[]) => {
            this.setState({ homes });
        };
        APIStore.savedHomes(this.listener);
    }

    componentWillUnmount() {
        APIStore.dispose(this.listener);
    }

    render(): React.Node {
        const {homes} = this.state;
        return (
            <Container withGutter>
                <ScrollView>
                    <IconButton name="ios-arrow-back-outline" onPress={this.back} />
                    <Text type="header1" gutterBottom>Saved Homes</Text>
                    {
                        homes.length === 0 && (
                            <Text type="header2" gutterBottom>
                            Nothing saved yet
                            </Text>
                        )
                    }
                    {
                        homes.length > 0 && (
                            <View>
                                <Text type="header2" gutterBottom>
                                You have saved the following homes
                                </Text>
                                {
                                    homes.map(home => (
                                        <HomeCard
                                            key={home.id}
                                            onPress={this.homeDetails}
                                            {...{ home }}
                                        />
                                    ))
                                }
                            </View>
                        )
                    }
                    <Text gutterBottom>
                        {`When you see something you like, tap on the heart to save it.
    If you're planning a trip with others, invite them so they can save and vote on their favorites.`}
                    </Text>
                    <Button onPress={this.explore} label="Start exploring" />
                </ScrollView>
            </Container>
        );
    }
}
