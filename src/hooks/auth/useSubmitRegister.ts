import { useState } from "react";
import { AuthService } from "../../services/auth/auth.service";
import { IRegisterUser } from "../../services/auth/interfaces/register-user.interface";
import axios from "axios";

const useSubmitRegister = () => {
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState<string>('');
    const [openModalError, setOpenModalError] = useState(false)

    const submitRegister = async (data: IRegisterUser, onSuccess: () => void) => {
        setLoading(true)

        try {
            const registerUser = await AuthService.register(data);
            onSuccess();
            console.log("esta es la data que llega al useSubmit", data);
            
            return registerUser;
        } catch (err: any) {
            console.log("este es el error desde register", err);
            if (err.status === 401) {
                setErrorText('El email registrado ya existe');
                setOpenModalError(true)
            } else {
                setErrorText(err.message || 'Error al agregar contacto');
                setOpenModalError(true)
            }

        } finally {
            setLoading(false);
        }
    }

    return { submitRegister, loading, errorText, openModalError, setOpenModalError }

}

export default useSubmitRegister;