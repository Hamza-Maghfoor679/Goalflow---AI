import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'

const Loader = () => {
  return (
    <View>
        <ActivityIndicator size={24} color={colors.primary} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})