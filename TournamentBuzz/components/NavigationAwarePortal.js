import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Portal } from 'react-native-paper';

// from https://github.com/callstack/react-native-paper/issues/541

class NavigationAwarePortal extends React.Component {
  state = {
    opacity: new Animated.Value(0),
  };

  componentDidMount() {
    this._willFocusListener = this.props.navigation.addListener('willFocus', this._show);
    this._willBlurListener = this.props.navigation.addListener('willBlur', this._hide);

    if (this.props.navigation.isFocused()) {
      this._show();
    }
  }

  componentWillUnmount() {
    this._willFocusListener.remove();
    this._willBlurListener.remove();
  }

  _show = () => {

    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  _hide = () => {

    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <Portal>
        <Animated.View
          pointerEvents="box-none"
          style={[styles.container, { opacity: this.state.opacity }]}>
          {this.props.children}
        </Animated.View>
      </Portal>
    );
  }
}

export default withNavigation(NavigationAwarePortal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
