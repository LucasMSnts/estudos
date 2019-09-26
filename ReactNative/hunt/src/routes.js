import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';

export default createStackNavigator({
    Main,
}, {
    navigationOptions:{
        headerTitleStyle: {
            textAlign: "center",
            flex: 1
        },
        headerStyle:{
            backgroundColor: "#DA552f"
        },
        headerTintColor: "#FFF"
    },
});