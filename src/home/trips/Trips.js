// @flow
import * as _ from "lodash";
import * as React from "react";
import {StyleSheet, ScrollView, View, Dimensions, SafeAreaView, Platform} from "react-native";
import {Constants} from "expo";

import BookingCard from "./BookingCard";

import {Theme, Text, APIStore} from "../../components";
import type {ScreenProps} from "../../components/Types";

export default class Trips extends React.PureComponent<ScreenProps<>> {

    render(): React.Node {
        const {navigation} = this.props;
        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.background} />
                <ScrollView style={styles.container}>
                    <View style={styles.contentContainer}>
                        <View style={styles.border} />
                        <View>
                            {
                                _.map(APIStore.bookingsByCities(), (bookings, city) => (
                                    <View key={city} style={styles.city}>
                                        <View style={styles.header}>
                                            <View style={styles.outerCircle}>
                                                <View style={styles.innerCircle} />
                                            </View>
                                            <Text type="header2">{city}</Text>
                                        </View>
                                        {
                                            bookings.map(booking => (
                                                <BookingCard
                                                    key={booking.id}
                                                    {...{ booking, navigation }}
                                                />
                                            ))
                                        }
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const {height} = Dimensions.get("window");
const styles = StyleSheet.create({
    root: {
        flexGrow: 1
    },
    background: {
        position: "absolute",
        left: Theme.spacing.base,
        top: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
        backgroundColor: Theme.palette.primary,
        width: 2,
        height
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        top: Platform.OS === "ios" ? Constants.statusBarHeight : 0
    },
    contentContainer: {
        paddingLeft: Theme.spacing.base,
        paddingRight: Theme.spacing.base,
        paddingTop: Theme.spacing.base * 2,
        paddingBottom: (Theme.spacing.base * 2) + 57,
        flexDirection: "row"
    },
    border: {
        backgroundColor: Theme.palette.primary,
        width: 2
    },
    city: {
        marginTop: Theme.spacing.base,
        marginBottom: Theme.spacing.base
    },
    header: {
        position: "relative",
        left: -Theme.spacing.base,
        flexDirection: "row",
        alignItems: "center"
    },
    outerCircle: {
        backgroundColor: "white",
        marginRight: Theme.spacing.base - 7 - 1
    },
    innerCircle: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: Theme.palette.primary,
        marginLeft: Theme.spacing.base - 7 - 1,
        marginTop: Theme.spacing.tiny,
        marginBottom: Theme.spacing.tiny
    }
});
