// @flow
import {NavigationActions, type NavigationScreenProp, type NavigationState} from "react-navigation";

export default class NavigationHelpers {
    static reset(navigation: NavigationScreenProp<NavigationState>, routeName: string, key: string | null = null) {
        const action = NavigationActions.reset({
            index: 0,
            key,
            actions: [
                NavigationActions.navigate({ routeName })
            ]
        });
        navigation.dispatch(action);
    }
}
