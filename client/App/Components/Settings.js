var React = require('react-native');
var NavigationBar = require('react-native-navbar');
var Keychain = require('react-native-keychain');
var Login = require('./Login');
var PhotosView = require('./PhotosView');
var FriendsView = require('./FriendsView');
var ChangeView = require('./ChangeView');

var {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ActionSheetIOS,
} = React;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Settings';
  }

  openMyPhotos() {
    this.props.navigator.push({
      component: PhotosView,
      userId: this.props.userId,
      favorites: true,
      previousComponent: 'settings'
    });
  }

  openFriendsView() {
    this.props.navigator.push({
      component: FriendsView,
      userId: this.props.userId,
      favorites: true,
      streams: true,
      previousComponent: 'settings'
    });
  }

  logout() {
    Keychain
      .resetGenericPassword()
      .then(function() {
        console.log('Credentials successfully deleted');
      });
    this.props.navigator.popToTop();
  }

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Logout', 'Cancel'],
      cancelButtonIndex: 1,
      destructiveButtonIndex: 0,
      tintColor: '#565b5c'
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        this.logout();
      }
    });
  }

  changeInfo() {
    this.props.navigator.push({
      component: ChangeView,
      username: this.props.username
    });
  }

  render() {
    var pageTitle = (
      <Text style={styles.pageTitle}>Settings</Text>
    );
    return (
      <View style={{ flex: 1, backgroundColor: '#ededed'}}>
        <NavigationBar 
          title={pageTitle} 
          tintColor={"white"}
        />
        <View style={styles.imageContainer}>
          <Image source={require('./../../images/logoresized.png')} style={styles.image}/>
        </View>
        <View style={styles.mainContainer}>
          <TouchableHighlight
            style={styles.touchableHighlightButton}
            underlayColor={'#e66365'}
            onPress={this.openMyPhotos.bind(this)}
          >
            <Text style={styles.touchableHighlightText}>Your Photos</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.touchableHighlightButton}
            underlayColor={'#e66365'}
            onPress={this.openFriendsView.bind(this)}
          >
            <Text style={styles.touchableHighlightText}>Friends</Text>
          </TouchableHighlight>
          <TouchableOpacity
            style={styles.button}
            onPress={this.changeInfo.bind(this)}
          >
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.showActionSheet.bind(this)}
          >
            <Text style={styles.buttonText}> Logout </Text>
          </TouchableOpacity>
        </View>

      </View>
      );
  }
}

var styles = StyleSheet.create({
  touchableHighlightText: {
    fontSize: 18,
    fontFamily: 'circular',
    color: 'white',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'circular',
    color: '#565b5c',
    alignSelf: 'center'
  },
  touchableHighlightButton: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#FF5A5F',
    borderColor: '#FF5A5F',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 7.5,
    marginTop: 0,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 7.5,
    marginTop: 0,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 228,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'circular',
    textAlign: 'center',
    color: '#565b5c'
  }
});

module.exports = Settings;
