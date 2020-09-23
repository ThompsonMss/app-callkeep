import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Clipboard,
  ToastAndroid,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import makeStyles from './styles';

import {requestTokenFirebase} from '../../services/firebase';
import RNCallKeep from 'react-native-callkeep';

import createUUID from '../../helpers/createUUID';

export default function Main() {
  const styles = makeStyles();
  const [token, setToken] = React.useState('');

  /*  RECUPERANDO TOKEN DO FIREBASE */
  async function getToken() {
    const tokenRequest = await requestTokenFirebase(display);
    setToken(tokenRequest);
  }

  React.useEffect(() => {
    getToken();
  }, []);

  /*  FUNÇÃO QUE COPIA O TOKEN */
  function copy(_token) {
    if (_token) {
      Clipboard.setString(_token);
      ToastAndroid.show('Token copiado!', ToastAndroid.SHORT);
    }
  }

  /* CONFIGURAÇÕES PARA RECUPERAR AS PERMISSÕES DO USUÁRIO - ANDROID */
  const options = {
    ios: {
      appName: 'Nome do meu app',
    },
    android: {
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
      imageName: 'phone_account_icon',
      additionalPermissions: [PermissionsAndroid.PERMISSIONS.CALL_PHONE],
    },
  };

  RNCallKeep.setup(options).then((accepted) => {
    RNCallKeep.setAvailable(true);
  });

  /* DEFININDO UMA CONTA DE TELEFONE PARA O APLICATIVO */
  React.useEffect(() => {
    definirContaTelefonePadrao();
  }, []);

  async function definirContaTelefonePadrao() {
    const status = await RNCallKeep.hasPhoneAccount();
    if (status == false) {
      const optionsDefaultNumber = {
        alertTitle: 'Padrão não definido.',
        alertDescription: 'Defina a conta de telefone padrão.',
      };

      RNCallKeep.hasDefaultPhoneAccount(optionsDefaultNumber);
    }
  }

  /* FUNÇÃO QUE ESCUTA QUANDO SE ATENDE UMA CHAMADA NO CELULAR */
  RNCallKeep.addEventListener('answerCall', ({callUUID}) => {
    console.log('Recebendo uma chamada: ', callUUID);
    RNCallKeep.setCurrentCallActive(callUUID);
  });

  /* FUNÇÃO QUE ESCUTA QUANDO SE ENCERRA UMA CHAMADA NO CELULAR */
  RNCallKeep.addEventListener('endCall', ({callUUID}) => {
    console.log('Usuário encerrou a chamada');
  });

  RNCallKeep.addEventListener(
    'didDisplayIncomingCall',
    ({error, callUUID, handle, localizedCallerName, hasVideo, fromPushKit}) => {
      // você pode fazer as seguintes ações ao receber este evento:
      // - iniciar a reprodução de toque se for uma chamada efetuada
      console.log('Realizando chamada.');
    },
  );

  RNCallKeep.addEventListener(
    'didReceiveStartCallAction',
    ({handle, callUUID, name}) => {},
  );

  /* FUNÇÃO QUE ESCUTA QUANDO UMA TECLA É PRESSIONADA */
  RNCallKeep.addEventListener('didPerformDTMFAction', ({digits, callUUID}) => {
    console.log('Capturando tecla: ', digits);
  });

  /* FUNÇÃO QUE EXCECUTA A CHAMADA NO CELULAR */
  async function display() {

    /* Garantindo que esse telefone setou esse aplicativo como uma conta de telefone */
    await definirContaTelefonePadrao();

    /* Gerando um UUID válido - Geralmente é fornecido pelos próprios serviços VOIP */
    const uuid = createUUID();

    try {
      /* FUNÇÃO QUE GERA A CHAMADA */
      RNCallKeep.displayIncomingCall(
        uuid,
        'CHAMADA NATIVA, UHULL!',
        'Thompson Silva',
      );
      RNCallKeep.answerIncomingCall(uuid);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  /* FUNÇÃO PARA REALIZAR UMA CHAMADA - É DIFERENTE DE RECEBER UMA CHAMADA */
  function chamar() {
    const uuid = createUUID();
    RNCallKeep.startCall(uuid, '+5561999885533', 'Teste Teste');
  }

  /* FUNÇÃO QUE VERIFICA SE O CELULAR TEM SUPORTE PARA ESSA FUNCIONALIDADE DE CHAMADA */
  function connectionService() {
    const status = RNCallKeep.supportConnectionService();
    Alert.alert('Connection Service disponível: ', status ? 'Sim' : 'Não');
  }

    /* FUNÇÃO QUE VERIFICA SE O CELULAR TEM UMA CONTA PADRÃO */
  async function contaTelefone() {
    const status = await RNCallKeep.hasPhoneAccount();
    Alert.alert('Conta Telefone configurada: ', status ? 'Sim' : 'Não');
  }

  return (
    <View style={styles.container}>
      {/* Container Imagem */}
      <View>
        <View style={styles.contentTitle}>
          <Text style={[styles.contentTitle.text, styles.contentTitle.bold]}>
            Call
          </Text>
          <Text style={styles.contentTitle.text}>Keep</Text>
        </View>
      </View>

      {/* Container Actions */}
      <View style={styles.contentAction}>
        <View style={styles.contentToken}>
          <Text style={styles.contentToken.text}>Seu token do firebase:</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => copy(token)}
            style={styles.contentToken.box}>
            <Text style={styles.contentToken.box.text}>{token}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => display()}
          style={[styles.buttons.button, styles.buttons.button.colorBlurple]}>
          <Text style={styles.buttons.button.text}>Chamada Local</Text>
        </TouchableOpacity>
      </View>

      {/* Container Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://thompson.dev.br')}
          style={styles.footer.button}>
          <Text style={styles.footer.text}>thompson.dev.br</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
