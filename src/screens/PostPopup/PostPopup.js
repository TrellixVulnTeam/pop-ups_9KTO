import React, { Component } from 'react'
import { ActivityIndicator, View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'

import SpotInput from '../../components/SpotInput/SpotInput'
import StartInput from '../../components/StartInput/StartInput'
import EndInput from '../../components/EndInput/EndInput'
import InfoInput from '../../components/InfoInput/InfoInput'
import { addPopup } from '../../store/actions/index'
import GlobalText from '../../components/UIComponents/GlobalText'
import Header from '../../components/UIComponents/Header'
import ImageSelector from '../../components/ImageSelector/ImageSelector'
import DropPin from '../../components/DropPin/DropPin'


class PostPopupScreen extends Component{
    state = {
       controls: {
           spot: {
               value: ''
           },
           location: {
                value: null,
                valid: false
           },
           start: {
               value: ''
           },
           end: {
               value: ''
           },
           info: {
               value: ''
           },
           image: {
               value: null,
               valid: false
           }
       }
    }

    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    onNavigatorEvent = e => {
        if(e.type === 'NavBarButtonPress') {
            if(e.id === 'leftDrawerToggle'){
                this.props.navigator.toggleDrawer({
                    animated: true,
                    side: 'left'
                })
            }
        }
    }

    //not in use
    inputChangedHandler = key => {
        return (value) => {
            this.setState({
                [key]: value
            })
        }
    }

    spotChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    spot: {
                        ...prevState.controls.spot,
                        value: val
                    }
                }
            }
        })
    }

    startChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    start: {
                        ...prevState.controls.start,
                        value: val
                    }
                }
            }
        })
    }

    endChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    end: {
                        ...prevState.controls.end,
                        value: val
                    }
                }
            }
        })
    }

    infoChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    info: {
                        ...prevState.controls.info,
                        value: val
                    }
                }
            }
        })
    }

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    imageSelectedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }
    //to monitor state - 
    //in render - <Text>{ JSON.stringify(this.state) }</Text>
    //check for valid times here
    popupAddedHandler = () => {
            this.props.onAddSpot(
                this.state.controls.spot.value,
                this.state.controls.location.value,
                this.state.controls.start.value,
                this.state.controls.end.value,
                this.state.controls.info.value,
                this.state.controls.image.value
            )
    }

    render() {
        let submitButton = (
            <Button title='Post Popup!' 
                onPress={this.popupAddedHandler}
                disabled={!this.state.controls.spot === '' || !this.state.controls.location}
                />
        )
        if (this.props.isLoading){
            submitButton = <ActivityIndicator />
        }
        return (
            <ScrollView>
            <View style={styles.container}>
                <GlobalText><Header>Post an event in your area!</Header></GlobalText>
                <ImageSelector onImageSelected={this.imageSelectedHandler}/>
                <DropPin onLocationPick={this.locationPickedHandler}/>
                
                <SpotInput 
                spot={this.state.controls.spot.value}
                onChangeText={this.spotChangedHandler}
                />
                <StartInput 
                start={this.state.controls.start.value}
                onChangeText={this.startChangedHandler}
                />
                <EndInput 
                end={this.state.controls.end.value}
                onChangeText={this.endChangedHandler}
                />
                <InfoInput 
                info={this.state.controls.info.value}
                onChangeText={this.infoChangedHandler}
                autoCorrect={false}
                />
                <View style={styles.button}>

                {submitButton}

                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'teal',
        width: '80%',
        height: 150
    },
    button: {
        margin: 9
    },
    placeholderImage: {
        width: '100%',
        height: '100%'
    }
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddSpot: (spot, location, start, end, info, image) => dispatch(addPopup(spot, location, start, end, info, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPopupScreen)