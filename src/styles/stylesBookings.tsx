import { StyleSheet } from 'react-native';

export const stylesBookings = StyleSheet.create({
  containerExtern:{
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderBottomColor: 'rbg(232, 232, 232)',
    borderBottomWidth: 0.4,
    shadowColor: '#000',
    shadowOpacity: 0.01,
    shadowRadius: 5,
  },
  rowContainer: {
    flexDirection: 'row', 
    marginBottom: 5,
  },
  restaurantImage: {
    width: 100, 
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1, 
    justifyContent: 'center',
  },
  dateText: {
    color: '#AAA',
    fontSize: 14,
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium'
  },
  reservationDetails: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Poppins-Light'
  },
  specialExperienceLabel: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)', 
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'rgba(90, 0, 230, 1)',
    marginBottom: 2,
  },
  specialExperienceLabelText: {
    paddingRight: 18,
    paddingLeft: 18,
    paddingBottom: 3,
    paddingTop: 3,
    color: 'rgba(90, 0, 230, 1)', 
    fontFamily: 'Poppins-Medium', 
    fontSize: 10
  },  
  actionButton: {
    flexDirection: 'row',
    borderTopWidth: 5,
    borderTopColor: 'white',
    justifyContent: 'space-between',
    paddingRight: 4
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  actionButtonContent: {
    marginTop: 3,
    backgroundColor: 'rgba(98, 0, 238, 1)', 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 3
  },
  disabledButton: {
    opacity: 0.3,  
  },
  labelContainer: {
    position: 'absolute',
    top: -20, // Posiziona sopra il pulsante o in una posizione desiderata
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  disabledLabel: {
    fontSize: 14,
    color: 'rgba(98, 0, 238, 1)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    textAlign: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '100%', 
    alignSelf: 'center',
  },  
  icon: {
    marginRight: 8, 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  modalOverlay: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 7,
    right: 13,
    zIndex: 1,  
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  explanationText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontStyle: 'italic', 
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  scanButton: {
    backgroundColor: 'rgba(98, 0, 238, 1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
  },
  specialExperienceTitle: {
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 2, 
    marginTop: 10, 
    fontFamily: 'Poppins-Semibold'
  },
  button: {
    backgroundColor: '#6200ee',  
    paddingVertical: 12,         
    paddingHorizontal: 30,       
    borderRadius: 25,            
    justifyContent: 'center',    
    alignItems: 'center',        
    marginTop: 20,               
    shadowColor: '#000',         
    shadowOffset: { width: 0, height: 2 },  
    shadowOpacity: 0.4,          
    shadowRadius: 4,             
  },
  buttonText: {
    color: '#fff',               
    fontSize: 18,                
    fontFamily: 'Poppins-Light'
  },
  specialExperienceDescription: {
    fontSize: 12, 
    color: '#555', 
    fontFamily: 'Poppins-Light'
  },
  specialExperiencePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
  },
  ellipsis: {
    alignSelf: 'center',  
    padding: 8,
    justifyContent: 'center',  
    alignItems: 'center', 
    borderWidth: 0.1,
  },
  upButtons: {
    flexDirection: 'row',  
    alignItems: 'center', 
    justifyContent: 'flex-end',
  },
  downArrow: {
    alignItems: 'center',
    padding: 5
  },
  qrCodeTitle: {
    fontSize: 22,
    marginBottom: 30, 
    justifyContent: 'center',
    fontFamily: 'Poppins-Light',
    width: '90%',
    textAlign: 'center',
  },
  qrCodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 25,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '100%',
  },
  buttonQRcode: {
    backgroundColor: '#6200ee',  
    paddingVertical: 12,         
    paddingHorizontal: 30,       
    borderRadius: 25,            
    justifyContent: 'center',    
    alignItems: 'center',        
    marginTop: 50,               
    shadowColor: '#000',         
    shadowOffset: { width: 0, height: 2 },  
    shadowOpacity: 0.4,          
    shadowRadius: 4,             
  }
});