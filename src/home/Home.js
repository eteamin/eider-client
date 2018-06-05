// @flow
import * as React from "react";
import {StyleSheet, ScrollView, View, Text, TouchableWithoutFeedback, SafeAreaView} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";

import {Theme, Container} from "../components";

import type {BaseProps, NavigationProps} from "../components/Types";

type Tab = { label: string, icon: string };

export class HomeTab extends React.Component<NavigationProps<*>> {

    static tabs: Tab[] = [
        { label: "Inbox", icon: "ios-chatbubbles-outline" }
    ];

    render(): React.Node {
        const {navigation} = this.props;
        const navState = navigation.state;
        const currentIndex = navState.index;
        return (
            <SafeAreaView style={tabStyles.tabs}>
                <View style={tabStyles.container}>
                    {
                        HomeTab.tabs.map((info, i) => {
                            const color = i === currentIndex ? Theme.palette.secondary : "#444444";
                            return (
                                <TouchableWithoutFeedback
                                    key={info.label}
                                    onPress={
                                        () => (i !== currentIndex ? this.props.navigation.navigate(info.label) : null)
                                    }
                                >
                                    <View style={tabStyles.tab}>
                                        <Icon name={info.icon} size={25} {...{ color }} />
                                        <Text style={[tabStyles.label, { color }]}>
                                            {info.label.toUpperCase()}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        })
                    }
                </View>
            </SafeAreaView>
        );
    }
}

type HomeContainerProps = BaseProps & {
    withGutter?: boolean,
    children: React.ChildrenArray<React.Element<*>>
};

// eslint-disable-next-line react/no-multi-comp
export class HomeContainer extends React.PureComponent<HomeContainerProps> {
    render(): React.Node {
        const {withGutter, style, children} = this.props;
        return (
            <Container {...{ withGutter }}>
                <ScrollView {...{ style }}>
                    {children}
                </ScrollView>
            </Container>
        );
    }
}

const tabStyles = StyleSheet.create({
    tabs: {
        borderTopWidth: 1,
        borderColor: "#d6d6d6"
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 57
    },
    tab: {
        alignItems: "center"
    },
    label: {
        ...Theme.typography.micro
    }
});
