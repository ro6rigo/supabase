import { useState } from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/lib/supabase';
import { View, Text, StyleSheet, Button, Alert, TextInput, Pressable, Platform } from 'react-native'
import Colors from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Profile(){
    const { setAuth, user } = useAuth();
    const [ date, setDate ] = useState(new Date());
    const [ dateInput, setDateInput ] = useState('');
    const [ barber, setBarber ] = useState({id: 0, title: ''});
    const [ showPickerDate, setShowPickerDate ] = useState(false);
    const [ showPickerTime, setShowPickerTime ] = useState(false);
    const [ reserva, setReserva ] = useState({date:'', barber:''});

    // const emojisWithIcons = [
    //     {title: 'happy', icon: 'emoticon-happy-outline'},
    //     {title: 'cool', icon: 'emoticon-cool-outline'},
    //     {title: 'lol', icon: 'emoticon-lol-outline'},
    //     {title: 'sad', icon: 'emoticon-sad-outline'},
    //     {title: 'cry', icon: 'emoticon-cry-outline'},
    //     {title: 'angry', icon: 'emoticon-angry-outline'},
    //     {title: 'confused', icon: 'emoticon-confused-outline'},
    //     {title: 'excited', icon: 'emoticon-excited-outline'},
    //     {title: 'kiss', icon: 'emoticon-kiss-outline'},
    //     {title: 'devil', icon: 'emoticon-devil-outline'},
    //     {title: 'dead', icon: 'emoticon-dead-outline'},
    //     {title: 'wink', icon: 'emoticon-wink-outline'},
    //     {title: 'sick', icon: 'emoticon-sick-outline'},
    //     {title: 'frown', icon: 'emoticon-frown-outline'},
    //   ];
    const people = [
        {title: 'Joao Pedro', id: 4},
        {title: 'Vitorio', id: 3},
        {title: 'Yuri', id: 2},
        {title: 'Ygor', id: 1},
    ]

    const togglePickerDate = () => {
        setShowPickerDate(!showPickerDate)
    }
    const togglePickerTime = () => {
        setShowPickerTime(!showPickerTime)
    }

    const validateForm = () => {
        if(dateInput == '')
            Alert.alert('Error', 'Selecione uma data.')
        else if(barber.id == 0)
            Alert.alert('Error', 'Selecione um barbeiro.')
        else{
            Alert.alert('Success', 'Horario: '+dateInput+' Barbeiro: '+barber!.title)
            setReserva({date: dateInput, barber: barber.title})
        }
        return;
    }

    const handleChangeDate = ({ type }: any, selectedDate: any) => {
        if(type == 'set'){
            const currentDate = selectedDate;
            setDate(currentDate)
            setDateInput(currentDate.toUTCString())      
            togglePickerDate();      
        }else{
            togglePickerDate();    
        }
    }   
    const handleChangeTime = ({ type }: any, selectedDate: any) => {
        if(type == 'set'){
            const currentDate = selectedDate;
            setDate(currentDate)
            setDateInput(currentDate.toUTCString())      
            togglePickerTime();      
        }else{
            togglePickerTime();    
        }
    }   
    
    async function handleSignOut(){
        const { error } = await supabase.auth.signOut();
        setAuth(null)
        if(error){
            Alert.alert('Error', 'Erro ao sair da conta, tente mais tarde.')
            return;
        }
    }
   
    return(
        <View style={styles.container}> 
            <View style={{flexDirection:'row'}}>
                <View style={styles.header}> 
                    <Text style={styles.logoText}>
                        Olá, <Text style={{color: Colors.green}}>{user?.email}</Text>
                    </Text>
                    
                </View>
                <View style={styles.buttonSignOut}> 
                    <Button
                        title='Deslogar'
                        onPress={handleSignOut}
                    />                
                </View>
            </View>
            <View style={styles.form}> 
                <Text style={styles.slogan}>
                        Agende seu horário
                    </Text>
                
                {showPickerDate && (
                    <DateTimePicker
                        mode='date'
                        display='spinner'
                        value={date}
                        onChange={handleChangeDate}
                    />
                    
                )}
                {showPickerTime && (
                    <DateTimePicker
                        mode='time'
                        display='spinner'
                        value={date}
                        onChange={handleChangeTime}
                    />
                )}
                <View style={{flexDirection:'row'}}>
                    <Pressable style={styles.buttonSecondary} onPress={togglePickerDate}>
                        <Text style={styles.buttonText}>
                        Escolher Data
                        </Text>
                    </Pressable>       
                    
                    <Pressable style={styles.buttonSecondary} onPress={togglePickerTime}>
                        <Text style={styles.buttonText}>
                        Escolher Horario
                        </Text>
                    </Pressable>  
                </View>  
                <Text style={styles.label}> Data/Hora </Text>
                <Text> {dateInput}</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={{paddingTop: 14, width:'60%'}}>
                        <SelectDropdown
                            data={people}
                            onSelect={(selectedItem, index) => {
                            //console.log(selectedItem, index);
                            setBarber(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                {/* {selectedItem && (
                                    <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                )} */}
                                <Text style={styles.dropdownButtonTxtStyle}>
                                    {(selectedItem && selectedItem.title) || 'Escolher Barbeiro'}
                                </Text>
                                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                </View>
                            );
                            }}
                            renderItem={(item, index, isSelected) => {
                            return (
                                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                </View>
                            );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                    </View>
                    <View style={{width:'60%'}}>
                        <Pressable style={styles.button} onPress={validateForm}>
                                <Text style={styles.buttonText}>
                                Agendar
                                </Text>
                        </Pressable> 
                    </View>
                </View>        
                {reserva.date!=='' && reserva.barber!==''&&(      
                    <View style={{marginTop: 100}}>
                        <Text style={styles.slogan}>
                        Agendamento Pendente
                        </Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'80%'}}>
                                <Text>
                                Horario: {reserva.date}
                                </Text>
                                <Text>
                                Barbeiro: {reserva.barber}
                                </Text>
                            </View>
                            <View>
                            <Icon name={'delete'} style={styles.dropdownItemIconStyle} onPress={()=>{setReserva({date:'', barber:''})}}/>
                            </View>
                        </View>
                    </View>
                )}
                {reserva.date!=='' && reserva.barber!==''&&(      
                    <View style={{marginTop: 100}}>
                        <Text style={styles.slogan}>
                        Agendamento Aprovado
                        </Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'80%'}}>
                                <Text>
                                Horario: {reserva.date}
                                </Text>
                                <Text>
                                Barbeiro: {reserva.barber}
                                </Text>
                            </View>
                            <View>
                            <Icon name={'delete'} style={styles.dropdownItemIconStyle} onPress={()=>{setReserva({date:'', barber:''})}}/>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
           flex: 1,
           paddingTop: 34,
           backgroundColor: Colors.zinc,
       },
    header: {
            paddingLeft: 14,
            paddingRight: 14,
            width: '60%'
        },
        logoText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.white,
            marginBottom: 8
        },
        slogan: {
            fontSize: 34,
            //color: Colors.white,
            marginBottom: 14
        },
        form: {
                flex: 1,
                backgroundColor: Colors.white,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                paddingTop: 24,
                paddingLeft: 14,
                paddingRight: 14
            }
            ,
            input: {
                borderWidth: 1,
                borderColor: Colors.gray,
                borderRadius: 8,
                marginBottom: 16,
                paddingHorizontal: 8,
                paddingTop: 14,
                paddingBottom: 14
            }
            ,
            label: {
                color: Colors.zinc,
                marginBottom: 4,
                fontSize: 20,
            },
            buttonSecondary:{
                backgroundColor: Colors.zinc,
                paddingTop: 14,
                marginLeft: 5,
                marginRight: 50,
                paddingBottom: 14,
                marginBottom: 16,
                alignItems: 'center',
                justifyContent: 'center',
                width: '40%',
                borderRadius: 8
            }
            ,
            button: {
                backgroundColor: Colors.green,
                paddingTop: 14,
                marginRight: 20,
                marginLeft: 20,
                paddingBottom: 14,
                marginBottom: 16,
                marginTop: 16,
                alignItems: 'center',
                justifyContent: 'center',
                width: '40%',
                borderRadius: 8
            }
            ,
            buttonText: {
                color: Colors.white,
                fontWeight: 'bold'
            },
            buttonSignOut: {
                // flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 14,
                width: '40%'
            },
            dropdownButtonStyle: {
                width: 200,
                height: 50,
                backgroundColor: '#E9ECEF',
                borderRadius: 12,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 12,
              },
              dropdownButtonTxtStyle: {
                flex: 1,
                fontSize: 18,
                fontWeight: '500',
                color: '#151E26',
              },
              dropdownButtonArrowStyle: {
                fontSize: 28,
              },
              dropdownButtonIconStyle: {
                fontSize: 28,
                marginRight: 8,
              },
              dropdownMenuStyle: {
                backgroundColor: '#E9ECEF',
                borderRadius: 8,
              },
              dropdownItemStyle: {
                width: '100%',
                flexDirection: 'row',
                paddingHorizontal: 12,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 8,
              },
              dropdownItemTxtStyle: {
                flex: 1,
                fontSize: 18,
                fontWeight: '500',
                color: '#151E26',
              },
              dropdownItemIconStyle: {
                fontSize: 28,
                marginRight: 8,
                color: 'red'
              },
});