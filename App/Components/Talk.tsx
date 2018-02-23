import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback, LayoutAnimation, Animated } from 'react-native'
import TalkInfo from './TalkInfo'
import TimeIndicator from './TimeIndicator'
import styles from './Styles/TalkStyle'
import FadeIn from 'react-native-fade-in-image'

interface TalkProps {
  title: string
  name: string
  avatarURL: string
  start: Number
  duration: number
  isFinished: boolean
  showWhenFinished: boolean
  isCurrentDay: boolean
  isActive: boolean
  currentTime: Date
  location: string
  room: string
  onPress (): void
}

interface TalkState {
  isActive: boolean,
  animatedSize: Animated.Value
}

export default class Talk extends React.Component<TalkProps, TalkState> {
  constructor (props) {
    super(props)

    this.state = {
      isActive: false,
      animatedSize: new Animated.Value(1)
    }
  }

  handlePressIn = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1.05,
      useNativeDriver: true
    }).start()
  }

  handlePressOut = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true
    }).start()
  }

  render () {
    const {
      isCurrentDay,
      isActive,
      name,
      title,
      avatarURL,
      start,
      duration,
      currentTime,
      isFinished,
      location,
      room
    } = this.props

    const animatedStyle = {
      transform: [{ scale: this.state.animatedSize }]
    }

    const containerStyles = [
      styles.container,
      animatedStyle
    ]

    return (
      <View>
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          onPress={this.props.onPress}
        >
          <Animated.View style={containerStyles}>
            <View style={styles.info}>
              <View style={styles.infoText}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.title}>{title}</Text>
              </View>
              { avatarURL != "" &&
              <FadeIn>
                <Image style={styles.avatar} source={{uri: avatarURL}} />
              </FadeIn>
              }
            </View>
            <TalkInfo
              start={start}
              duration={duration}
              isFinished={isFinished || isActive}
              showWhenFinished={this.props.showWhenFinished}
              room={room}
              location={location}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
