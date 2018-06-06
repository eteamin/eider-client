// @flow
/* eslint-disable global-require */
import {Asset} from "expo";

export default class Images {

    static loading = require("./loading.jpg");

    static downloadAsync(): Promise<*>[] {
        return [
            Asset.loadAsync(Images.loading)
        ];
    }
}
