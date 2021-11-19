import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { SafeAreaScrollView, Text } from 'components'
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { mainColor, shadow, textColor } from '../globalStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { fonts, getAppFontEnable, setAppFontEnable } from './../fonts'

const Settings: React.FC = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [isEnabled, setIsEnabled] = useState(Boolean);  
  const initialRender = useRef(true);

  const toggleSwitch = async () => {
    setIsEnabled(isEnabled => !isEnabled);
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setFlag()
    }
  }, [isEnabled])

  const setFlag = async() => {
    await setAppFontEnable(JSON.stringify(isEnabled))
  }

  useEffect(() => {  
    loadSystemFontEnableStatus()
  }, [])

  const loadSystemFontEnableStatus = async () => {
    setIsEnabled(await getAppFontEnable())
  }

  return (
    <SafeAreaScrollView>
      <View style={styles.container}>
        <Text style={[styles.groupHeader, {fontFamily: isEnabled ? fonts.openSans_bold: fonts.system}]}>{t('Settings.app_preferences')}</Text>

        <View style={styles.rowGroup}>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Language')}>
            <Text style={{fontFamily: isEnabled ? fonts.openSans_regular: fonts.system}}>{t('Settings.language')}</Text>
            <Icon name={'chevron-right'} size={25} color={mainColor} />
          </TouchableOpacity>
          <View style={styles.row}>
            <Text style={{fontFamily: isEnabled ? fonts.openSans_regular: fonts.system}}>{t('Settings.use_app_font')}</Text>
            <Switch
              trackColor={{ false: textColor, true: mainColor }}
              thumbColor={isEnabled ? mainColor : textColor}
              ios_backgroundColor= {shadow}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <Text style={[styles.groupHeader, {fontFamily: isEnabled ? fonts.openSans_bold: fonts.system}]}>{t('Settings.about_app')}</Text>
        <View style={styles.rowGroup}>
          <View style={styles.row}>
            <Text style={{fontFamily: isEnabled ? fonts.openSans_regular: fonts.system}}>{t('Settings.version')}</Text>
            <Text style={{fontFamily: isEnabled ? fonts.openSans_regular: fonts.system}}>{t('Settings.version_string')}</Text>
          </View>

          <View style={styles.row}>
            <Text style={{fontFamily: isEnabled ? fonts.openSans_regular: fonts.system}}>{t('Settings.AMA-RN_version')}</Text>
            <Text style={{fontFamily: isEnabled ? fonts.openSans_regular: fonts.system}}>{t('Settings.AMA-RN_version_string')}</Text>
          </View>
        </View>
      </View>
    </SafeAreaScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  groupHeader: {
    fontSize: 20,
    // fontFamily: getAppFontEnable() ? fonts.openSans_bold : fonts.system,
    marginVertical: 15,
  },
  rowGroup: {
    borderRadius: 8,
    backgroundColor: shadow,
  },
  row: {
    paddingVertical: 12,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})


export default Settings