// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet, Image, Dimensions, ScrollView, Animated} from "react-native";
import {Constants, MapView} from "expo";
import Swiper from "react-native-swiper";

import {Text, Theme, APIStore, IconButton, Avatar, LoadingIndicator, Ratings} from "../../components";
import type {ScreenParams} from "../../components/Types";

type HomeOverviewState = {
    scrollY: Animated.Value,
    loading: boolean
};

export default class HomeOverview extends React.Component<ScreenParams<{ id: string }>, HomeOverviewState> {

    state = {
        scrollY: new Animated.Value(0),
        loading: true
    };

    async componentDidMount(): Promise<void> {
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        const home = APIStore.home(id);
        await Promise.all(home.pictures.map(picture => Image.prefetch(picture)));
        this.setState({ loading: false });
    }

    @autobind
    back() {
        this.props.navigation.goBack();
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        const home = APIStore.home(id);
        const {scrollY, loading} = this.state;
        const onScroll = Animated.event([{
            nativeEvent: {
                contentOffset: {
                    y: scrollY
                }
            }
        }]);
        const threshold = height - 57 - Constants.statusBarHeight;
        const backgroundColor = scrollY.interpolate({
            inputRange: [0, threshold - 5, threshold],
            outputRange: ["transparent", "transparent", "white"]
        });
        const iconStyle = {
            color: scrollY.interpolate({
                inputRange: [0, threshold - 5, threshold],
                outputRange: ["white", "white", Theme.typography.color]
            })
        };
        return (
            <View style={styles.flex}>
                <Animated.View style={[styles.header, { backgroundColor }]}>
                    <IconButton name="ios-arrow-back-outline" onPress={this.back} animated {...{iconStyle}} />
                </Animated.View>
                <ScrollView style={styles.flex} scrollEventThrottle={1} {...{onScroll}}>
                    {
                        loading && <LoadingIndicator style={styles.loading} />
                    }
                    {
                        !loading && (
                            <Swiper showsPagination={false} {...{ height }}>
                                {
                                    home.pictures.map(picture => (
                                        <Image
                                            key={picture}
                                            source={{ uri: picture }}
                                            style={styles.image}
                                        />
                                    ))
                                }
                            </Swiper>
                        )
                    }
                    <View style={styles.container}>
                        <Text type="header2" gutterBottom>{home.title}</Text>
                        <View style={styles.host}>
                            <View>
                                <Text type="large" gutterBottom>{home.category1}</Text>
                                <Text gutterBottom>{`Hosted by ${home.host.name}`}</Text>
                            </View>
                            <Avatar uri={home.host.picture} />
                        </View>
                        <Text>
                            {`${home.price.amount} ${home.price.currency} per night`}
                        </Text>
                        <Ratings value={home.rating.value} votes={home.rating.votes} />
                        <Text gutterBottom>{home.description}</Text>
                    </View>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: home.location.lat,
                            longitude: home.location.lon,
                            latitudeDelta: 0.0022,
                            longitudeDelta: 0.0022
                        }}
                    >
                        <MapView.Marker
                            coordinate={{ latitude: home.location.lat, longitude: home.location.lon }}
                            title={home.location.address}
                        />
                    </MapView>
                </ScrollView>
            </View>
        );
    }
}

const {width} = Dimensions.get("window");
const height = (width * 0.67) + Constants.statusBarHeight;
const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    header: {
        position: "absolute",
        top: 0,
        height: 57 + Constants.statusBarHeight,
        zIndex: 1000,
        paddingTop: Constants.statusBarHeight,
        paddingLeft: Theme.spacing.base,
        justifyContent: "center",
        width
    },
    image: {
        width,
        height
    },
    container: {
        padding: Theme.spacing.base
    },
    host: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    map: {
        height: width * 0.62,
        width
    },
    loading: {
        height
    }
});
