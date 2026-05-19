import { lazy, Suspense, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout'
import { resetPassword } from '../../api/authService';
import { useNavigate } from 'react-router-dom';
import RecoveryPasswordForm from '../auth/recovery-password/RecoveryPasswordForm.tsx';
import RecoveryPasswordSendSkeleton from '../auth/recovery-password/RecoveryPasswordSendSkeleton.tsx';

export default function RecoveryPage() {

    const RecoveryPasswordSend = lazy(() => import("../auth/recovery-password/RecoveryPasswordSend.tsx"));
    const RecoveryPasswordError = lazy(() => import("../auth/recovery-password/RecoveryPasswordError.tsx"));

    const STATUS = {
        IDLE: 'default',
        SEND: 'send',
        ERROR: 'error',
    } as const;
    type QueryStatus = (typeof STATUS)[keyof typeof STATUS];

 
    const LOGOVARIANT = {
        DEFAULT: 'default',
        SUCCESS: 'success',
        ERROR: 'error',
        SKELETON: 'skeleton',
    } as const;
    type LogoVariantChoice = (typeof LOGOVARIANT)[keyof typeof LOGOVARIANT];

    const [queryStatus, setQueryStatus] = useState<QueryStatus>(STATUS.IDLE);
    const [contentTitle, setContentTitle] = useState("Récupération du mot de passe")
    const [contentLogoVariant, setContentLogoVariant] = useState<LogoVariantChoice>(LOGOVARIANT.DEFAULT)

    const navigate = useNavigate();

    const handleRecoveryPassword = async (email: string) => {
        try {
            await resetPassword(email);
            setQueryStatus(STATUS.SEND)
            setContentTitle("Récupération envoyée!")
            setContentLogoVariant(LOGOVARIANT.SUCCESS)
            //console.log("send - recovery")
        }
        catch (err: any) {
            setQueryStatus(STATUS.ERROR)
            setContentTitle("Erreur rencontrée")
            setContentLogoVariant(LOGOVARIANT.ERROR)
            //console.log("error - recovery")
        }
    }

    const returnToLoginPage = () => {
        navigate("/login")
    }

    const resetRecoveryContent = () => {
            setQueryStatus(STATUS.IDLE)
            setContentTitle("Récupération du mot de passe")
            setContentLogoVariant(LOGOVARIANT.DEFAULT)
    }
   
    const handleReturnButtonAction = () => { 
        switch (queryStatus) {
            case STATUS.IDLE:
                returnToLoginPage();
                break;
            case STATUS.SEND:
                returnToLoginPage();
                break;
            case STATUS.ERROR:
                resetRecoveryContent();
                break;
            default:
                returnToLoginPage();
                break;
        }
     }

    
    const content = (() => {
        switch (queryStatus) {
            case STATUS.IDLE:
                return <RecoveryPasswordForm handlerRecoveryPassword={handleRecoveryPassword} />;
            case STATUS.SEND:
                return <Suspense fallback={<RecoveryPasswordSendSkeleton />}><RecoveryPasswordSend /></Suspense>
            case STATUS.ERROR:
                return <Suspense fallback={<RecoveryPasswordSendSkeleton />}><RecoveryPasswordError /></Suspense>
            default:
                return <RecoveryPasswordForm handlerRecoveryPassword={handleRecoveryPassword} />;
        }
    })();


    return (
        <AuthLayout logoVariant={contentLogoVariant} title={contentTitle} labelActionBtn='Retour' onClickActionBtn={handleReturnButtonAction} >
            {content}
        </AuthLayout>
    )
}