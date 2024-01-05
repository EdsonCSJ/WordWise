import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#F0F4F7',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: '3em',
    justifyContent: 'center',
  },
  translationContainer: {
    height: '25%',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#222',
    justifyContent: 'space-evenly',
    borderRadius: 15,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F0F4F7',
    marginLeft: '5%',
    marginRight: '5%',
  },
  answersContainer: {
    marginTop: '10%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '40%',
    width: '90%',
    alignSelf: 'center',
    gap: 15,
    rowGap: 35,
  },
  answersContainer2: {
    height: '45%',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'start',
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    height: '15%',
    width: '100%',
    borderRadius: 15,
  },
  answerText: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F0F4F7',
    marginLeft: 5,
  },
  translationContainerButtoms: {
    flexDirection: 'row',
    height: '25%',
    justifyContent: 'space-evenly',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  story: {
    color: '#F0F4F7',
    padding: 20,
    textAlign: 'justify',
    fontWeight: 'bold'
  },
})

export default styles
