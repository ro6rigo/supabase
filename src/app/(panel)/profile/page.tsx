import { useState } from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/lib/supabase';
import { View, Text, StyleSheet, Button, Alert, TextInput, Pressable, Platform } from 'react-native'
import Colors from '@/constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker'

export default function Profile(){
    const { setAuth, user } = useAuth();
    const [ date, setDate ] = useState(new Date());
    const [ time, setTime ] = useState(new Date());
    const [ dateInput, setDateInput ] = useState('');
    const [ timeInput, setTimeInput ] = useState('');
    const [ showPickerDate, setShowPickerDate ] = useState(false);
    const [ showPickerTime, setShowPickerTime ] = useState(false);

    const togglePickerDate = () => {
        setShowPickerDate(!showPickerDate)
    }
    const togglePickerTime = () => {
        setShowPickerTime(!showPickerTime)
    }

    const handleChangeDate = ({ type }: any, selectedDate: any) => {
        if(type == 'set'){
            const currentDate = selectedDate;
            setDate(currentDate)
            setDateInput(currentDate.toLocaleString())      
            togglePickerDate();      
        }else{
            togglePickerDate();    
        }
    }   
    const handleChangeTime = ({ type }: any, selectedDate: any) => {
        if(type == 'set'){
            const currentDate = selectedDate;
            setDate(currentDate)
            setDateInput(currentDate.toLocaleString())      
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
            <View style={styles.header}> 
                <Text style={styles.logoText}>
                    Olá, <Text style={{color: Colors.green}}>{user?.email}</Text>
                </Text>
                <Text style={styles.slogan}>
                    Seja Bem-Vindo
                </Text>
            </View>
            <View style={styles.buttonSignOut}> 
                <Button
                    title='Deslogar'
                    onPress={handleSignOut}
                />                
            </View>
            <View style={styles.form}> 
                
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
                        value={time}
                        onChange={handleChangeTime}
                    />
                )}
                    
                <Pressable style={styles.button} onPress={togglePickerDate}>
                    <Text style={styles.buttonText}>
                    Escolher Data
                    </Text>
                </Pressable>       
                
                <Pressable style={styles.button} onPress={togglePickerTime}>
                    <Text style={styles.buttonText}>
                    Escolher Horario
                    </Text>
                </Pressable>  
                <Text style={styles.label}> Data/Hora </Text>
                <Text> {dateInput}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
           flex: 1,
           paddingTop: 34,
           backgroundColor: Colors.zinc
       },
    header: {
            paddingLeft: 14,
            paddingRight: 14,
        },
        logoText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.white,
            marginBottom: 8
        },
        slogan: {
            fontSize: 34,
            color: Colors.white,
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
            }
            ,
            button: {
                backgroundColor: Colors.green,
                paddingTop: 14,
                paddingBottom: 14,
                marginBottom: 16,
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
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
            }
});