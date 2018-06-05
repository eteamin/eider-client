// @flow
import * as React from "react";
import {View, StyleSheet, Image, Dimensions, TouchableWithoutFeedback} from "react-native";
import moment from "moment";

import {Text, APIStore, Theme} from "../../components";

import type {Booking} from "../../components/Model";
import type {NavigationProps} from "../../components/Types";

type BookingCardProps = NavigationProps<*> & {
    booking: Booking
};

export default class BookingCard extends React.PureComponent<BookingCardProps> {
    render(): React.Node {
        const {booking, navigation} = this.props;
        const from = moment(booking.from, "X");
        const to = moment(booking.to, "X");
        const home = APIStore.home(booking.home);
        const {id} = home;
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("HomeOverview", { id })}>
                <View style={styles.container}>
                    <Text gutterBottom>
                        {`${from.fromNow()} ${from.format("D")} – ${to.format("D")} ${to.format("MMM")}`}
                    </Text>
                    <View style={styles.card}>
                        <Image source={{ uri: home.pictures[0] }} style={styles.image} />
                        <View style={styles.text}>
                            <Text type="large" gutterBottom>{home.title}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const width = Dimensions.get("window").width - (Theme.spacing.base * 3);
const styles = StyleSheet.create({
    container: {
        marginLeft: Theme.spacing.base
    },
    card: {
        width,
        borderRadius: 2,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 1
    },
    image: {
        width,
        height: width * 0.62
    },
    text: {
        padding: Theme.spacing.tiny
    }
});
