import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthService } from "../../services/auth/auth.service";
import { ILoginUser } from "../../services/auth/interfaces/login-user.interface";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { saveToken } from "../../redux/features/userThunks";


const useSubmitLogin = () => {
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState<string>('');
    const [openModalError, setOpenModalError] = useState(false);
    const dispatch: AppDispatch = useDispatch<AppDispatch>();


    const submitLogin = async (data: ILoginUser, onSuccess: () => void) => {
        setLoading(true);
        console.log("entrando a login....");
        

        try {
            const loginUser = await AuthService.login(data);
            console.log("este es login user", loginUser );
            dispatch(saveToken(loginUser.data.token));
            await AsyncStorage.setItem('user', JSON.stringify(loginUser.data.user))        
            onSuccess(); 
        } catch (err: any) {
         
            if (err?.status === 401 || err?.status === 404) {
                console.log('si entra', err.status)
                setErrorText('Credenciales Inválidas'); 
                setOpenModalError(true);
              } else {
                setErrorText(err.message || 'Error en login');
                setOpenModalError(true);
              }
        } finally {
            setLoading(false);
        }
    };

    return{ submitLogin, loading, errorText, openModalError, setOpenModalError }

};

export default useSubmitLogin;