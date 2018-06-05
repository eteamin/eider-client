// @flow
import * as React from "react";

import SavedCard from "./SavedCard";

import {HomeContainer} from "../Home";

import {Images, Text} from "../../components";
import type {ScreenProps} from "../../components/Types";

export default class Saved extends React.PureComponent<ScreenProps<>> {

    render(): React.Node {
        const {navigation} = this.props;
        return (
            <HomeContainer withGutter>
                <Text type="header1" gutterBottom>Saved</Text>
                <SavedCard label="Homes" image={Images.homes} {...{navigation}} />
                <SavedCard label="Experiences" image={Images.experiences} {...{navigation}} />
                <SavedCard label="Restaurants" image={Images.restaurants} {...{navigation}} />
            </HomeContainer>
        );
    }
}
