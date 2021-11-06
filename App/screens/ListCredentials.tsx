import React from 'react'
import { FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useCredentials } from 'aries-hooks'

import { CredentialListItem, Text } from 'components'

import { backgroundColor } from '../globalStyles'

interface Props {
  navigation: any
}

const ListCredentials: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation()

  const { credentials } = useCredentials()

  return (
    <FlatList
      data={credentials}
      renderItem={({ item }) => <CredentialListItem credential={item} />}
      style={{ backgroundColor }}
      keyExtractor={(item: any) => item.credentialId}
      ListEmptyComponent={() => (
        <Text style={{ textAlign: 'center', margin: 100 }}>{t('ListCredentials.noneYet')}</Text>
      )}
    />
  )
}

export default ListCredentials
