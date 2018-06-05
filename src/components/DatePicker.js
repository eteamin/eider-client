// @flow
/* eslint-disable react-native/no-unused-styles */
import * as React from "react";
import {StyleSheet} from "react-native";
import RNDatePicker from "react-native-datepicker";

import {Theme} from "./Theme";

// eslint-disable-next-line react/prefer-stateless-function
export default class DatePicker extends React.PureComponent<{}> {

    render(): React.Node {
        return (
            <RNDatePicker
                mode="date"
                style={styles.datePicker}
                customStyles={styles}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
            />
        );
    }
}

const styles = StyleSheet.create({
    datePicker: {
        height: Theme.typography.regular.lineHeight
    },
    dateInput: {
        borderWidth: 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    dateText: {
        ...Theme.typography.regular,
        color: "white"
    },
    dateTouchBody: {
        flex: 1
    },
    btnTextConfirm: {
        color: Theme.palette.primary,
        height: 20
    },
    btnTextCancel: {
        height: 20
    }
});
