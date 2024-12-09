import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthService } from "../../services/auth/auth.service";
import { ILoginUser } from "../../services/auth/interfaces/login-user.interface";


const useSubmitLogin = () => {
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState<string>('');
    const [openModalError, setOpenModalError] = useState(false)


    const submitLogin = async (data: ILoginUser, onSuccess: () => void) => {
        setLoading(true);

        try {
            const loginUser = await AuthService.login(data);
            console.log("este es login user", loginUser );

            await AsyncStorage.setItem('user', JSON.stringify(loginUser.data.user))
            await AsyncStorage.setItem('token', JSON.stringify(loginUser.data.token))
            
            onSuccess(); 
        } catch (err: any) {
         
            if (err?.status === 401 || err?.status === 404) {
                console.log('si entra', err.status)
                setErrorText('Credenciales Inválidas'); 
                setOpenModalError(true);
              } else {
                setErrorText(err.message || 'Error al agregar contacto');
                setOpenModalError(true);
              }
        } finally {
            setLoading(false);
        }
    };

    return{ submitLogin, loading, errorText, openModalError, setOpenModalError }

};

export default useSubmitLogin;