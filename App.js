// @flow
/* eslint-disable global-require, indent */
import * as React from "react";
import {StyleProvider} from "native-base";
import {StackNavigator, TabNavigator} from "react-navigation";
import {Font, AppLoading} from "expo";

import {Images} from "./src/components";
import {Welcome} from "./src/welcome";
import { Inbox, Thread, HomeTab} from "./src/home";

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";

interface AppState {
    ready: boolean
}

export default class App extends React.Component<{}, AppState> {

    state: AppState = {
        ready: false
    };

    componentWillMount() {
        this.loadStaticResources();
    }

    async loadStaticResources(): Promise<void> {
        try {
            await Font.loadAsync({
                "SFProDisplay-Bold": require("./fonts/SF-Pro-Display-Bold.otf"),
                "SFProDisplay-Semibold": require("./fonts/SF-Pro-Display-Semibold.otf"),
                "SFProDisplay-Regular": require("./fonts/SF-Pro-Display-Regular.otf"),
                "SFProDisplay-Light": require("./fonts/SF-Pro-Display-Light.otf")
            });
            await Images.downloadAsync();
            this.setState({ ready: true });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }

    render(): React.Node {
        const {ready} = this.state;
        return (
            <StyleProvider style={getTheme(variables)}>
                {
                    ready ?
                        <AppNavigator onNavigationStateChange={() => undefined} />
                    :
                        <AppLoading />
                }
            </StyleProvider>
        );
    }
}

const StackNavigatorOptions = {
    headerMode: "none",
    cardStyle: {
        backgroundColor: "white"
    }
};

const InboxNavigator = StackNavigator({
    Inbox: { screen: Inbox },
    Thread: { screen: Thread }
}, StackNavigatorOptions);


const Home = TabNavigator({
    Inbox: { screen: InboxNavigator }
}, {
    animationEnabled: false,
    tabBarComponent: HomeTab,
    tabBarPosition: "bottom"
});

const AppNavigator = StackNavigator({
    Welcome: { screen: Welcome },
    Home: { screen: Home }
}, StackNavigatorOptions);

export {AppNavigator};
