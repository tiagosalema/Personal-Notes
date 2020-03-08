1. `react-native init ProjectName`
2. Open the android emulator
3. `react-native run-android`
4. Every time a module is installed: `react-native link && react-native run-android`



# Emulator

It's the fake device displayed in the computer.

**Hot reloading** updates just the parts of the project that were changed, whereas **Live reloading** updates all the files of the project, whether they were edited or not. Thus, hot reloading is faster. The caveat is that hot reloading not always works.



# Native Components

+ View, Text

+ Image

  + From a local file:

  ```jsx
  import MyImage from './images/img.png'; // put also in folder img@2x / img@3x (with more def.)
  <Image source={ MyImage } />
  ```

  + From a remote server:

  ```jsx
  <Image
    source = {{
      uri: "...",
      width: 100, height: 100 // can also be put into the style tag
    }}
    resizeMode="stretch|contain"
  />
  ```

  

+ Button

  ```jsx
  <Button
    title="info"
    color="#111"
    onPress={this.someFunction}
  />
  ```

  

  **Scroll**

  + `ScrollView` is a container that loads containing items all at once

  + `FlatList` loads specified amount of items. It isn't a container element. It renders what is specified in its attributes:

    ```jsx
    <FlatList
      data = { arrayWithObjects }
      renderItem = { ({ item, index }) => <Item item={item} index={index} /> }
      keyExtractor = { item => item.someUniqueKey }
    />
    ```

  **Touchable**

  Containers that make their contained element clickable. the function defined in the `onPressed` attribute will be executed.

  + `TouchableOpacity`

    Changes its opacity when it is clicked to signify the action of clicking.

  + `TouchableWithoutFeedback`

    Doesn't style the button.

  + `TouchableHighlight`

    Highlights the button when clicked. The `underlayColor` attribute changes the desired color.

# Modules

1. `react-native-vector-icons`

   ```jsx
   import Icon from 'react-native-vector-icon/FontAwesome';
   <Icon name="star|star-half" color="#FFD64C" />
   ```

2. `react-navigation`

   ```jsx
   import { createStackNavigator } from 'react-navigation';
   import HomePage from '...';
   import InfoPage from '...';
   
   export default createStackNavigator({
     Home: { screen: HomePage },
     Info: { screen: InfoPage }
   })
   ```

   + `createStackNavigator` gives the `navigation` prop to `SomePage`, where there is the `navigate` method.
   + `Home` and `Info` are the names that are going to be used to navigate to that page.

   