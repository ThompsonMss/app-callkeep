export default function makeStyles() {
  return {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    contentTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,

      text: {
        fontSize: 25,
        textTransform: 'uppercase',
      },

      bold: {
        fontWeight: 'bold',
      },
    },

    contentAction: {
      marginTop: 40,
    },

    contentToken: {
      width: '100%',
      padding: 20,

      text: {
        fontSize: 15,
      },

      box: {
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'solid',
        borderRadius: 4,
        marginTop: 5,
        padding: 10,
        width: '100%',

        text: {},
      },
    },
  };
}
