import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { useQueryClient } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { useMemo, useCallback, useState, Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, FAB, Card, Button, Portal, Dialog } from 'react-native-paper'

import { useSnackbarStore } from '@lib/snackbar'
import { useListUser, useDeleteUser } from '@lib/user'
import { colors } from '@themes/colors'

const iconEdit = () => <FontAwesome color={colors.primary} size={18} name="pencil" />
const iconDelete = () => <MaterialCommunityIcons color={colors.primary} size={18} name="delete" />

export const Screen = () => {
  const client = useQueryClient()

  const show = useSnackbarStore((state) => state.show)

  const [selected, setSelected] = useState<any>(null)

  const { navigate } = useNavigation<NavigationProp<any, any>>()

  const listUser = useListUser()

  const deleteUser = useDeleteUser()

  const flatData = useMemo(
    () => listUser.data?.pages?.flatMap((result) => result.data.data) || [],
    [listUser.data]
  )

  const handleRefresh = useCallback(() => {
    client.resetQueries({
      queryKey: ['user'],
    })
  }, [client])

  const handleEndReached = useCallback(() => {
    if (listUser.isFetching || listUser.isLoading || !listUser.hasNextPage) return

    listUser.fetchNextPage()
  }, [listUser])

  const [visible, setVisible] = useState(false)

  const showDialog = () => setVisible(true)

  const hideDialog = () => {
    setVisible(false)
    setSelected(null)
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <FlashList
          refreshing={listUser.isFetchingNextPage || listUser.isFetching || listUser.isLoading}
          data={flatData}
          onRefresh={handleRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={handleEndReached}
          estimatedItemSize={200}
          renderItem={({ item }) => (
            <Card style={styles.card} mode="contained">
              <Card.Content style={styles.cardContent}>
                <Image source={item.avatar} style={styles.image} />
                <View style={styles.cardLeft}>
                  <Text style={styles.label} variant="labelSmall">
                    Email
                  </Text>
                  <Text style={styles.value} variant="bodyMedium">
                    {item.email}
                  </Text>
                  <Text style={styles.label} variant="labelSmall">
                    Nama Depan
                  </Text>
                  <Text style={styles.value} variant="bodyMedium">
                    {item.first_name}
                  </Text>
                  <Text style={styles.label} variant="labelSmall">
                    Nama Belakang
                  </Text>
                  <Text style={styles.value} variant="bodyMedium">
                    {item.last_name}
                  </Text>
                  <View style={styles.cardActions}>
                    <Button
                      mode="text"
                      style={styles.editButton}
                      compact
                      icon={iconEdit}
                      contentStyle={styles.editButtonContent}
                      onPress={() => navigate('UpdateUserScreen', { user: item })}
                    >
                      Ubah
                    </Button>
                    <Button
                      mode="text"
                      style={styles.editButton}
                      compact
                      icon={iconDelete}
                      contentStyle={styles.editButtonContent}
                      onPress={() => {
                        setSelected(item)
                        showDialog()
                      }}
                    >
                      Hapus
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
          )}
          contentContainerStyle={styles.flashList}
        />
        <FAB
          mode="flat"
          icon="plus"
          style={styles.fab}
          onPress={() => navigate('CreateUserScreen')}
          color={colors.white_100}
          size="medium"
        />
      </View>
      <Portal>
        <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Peringatan</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Anda Akan Mengapus Pengguna</Text>
            <Text>
              {selected?.first_name} {selected?.last_name}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={styles.dialogButton}
              mode="contained"
              loading={deleteUser.isLoading}
              disabled={deleteUser.isLoading}
              onPress={() => {
                if (!selected?.id) return false

                return deleteUser
                  .mutateAsync(selected.id)
                  .then((result) => {
                    show({
                      title: `${selected?.first_name} ${selected?.last_name} Berhasil Di hapus`,
                      duration: 2000,
                      type: 'success',
                      actionTitle: 'ok',
                      // actionHandler: () => setSelected(null),
                    })
                    return result
                  })
                  .finally(hideDialog)
              }}
            >
              OK
            </Button>
            <Button
              style={styles.dialogButton}
              mode="outlined"
              onPress={hideDialog}
              disabled={deleteUser.isLoading}
            >
              Batal
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 12,
    marginHorizontal: 12,
  },
  cardActions: {
    alignItems: 'stretch',
    borderTopColor: colors.black_30,
    borderTopWidth: StyleSheet.hairlineWidth,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginTop: 12,
    paddingTop: 12,
    width: '100%',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardLeft: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  dialog: {
    backgroundColor: colors.white_100,
    borderRadius: 8,
  },
  dialogButton: {
    width: 80,
  },
  editButton: {
    borderRadius: 8,
    margin: 0,
    padding: 0,
  },
  editButtonContent: {
    margin: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  fab: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    bottom: 0,
    margin: 16,
    position: 'absolute',
    right: 0,
  },
  flashList: {
    paddingTop: 12,
  },
  image: {
    borderRadius: 8,
    height: 72,
    marginRight: 16,
    width: 72,
  },
  label: {
    color: colors.black_60,
  },
  value: {
    marginBottom: 4,
  },
})
