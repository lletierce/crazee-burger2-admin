import { lazy, Suspense, useState } from 'react';
import { confirmReset } from '../../api/authService';
import AuthLayout from '../layouts/AuthLayout';
import ResetPasswordForm from '../auth/reset-password/ResetPasswordForm.tsx';
import RecoveryPasswordSendSkeleton from '../auth/recovery-password/RecoveryPasswordSendSkeleton.tsx';
import { useSearchParams } from 'react-router-dom';

export default function ResetPasswordPage() {

  const ResetPasswordSuccess = lazy(() => import("../auth/reset-password/ResetPasswordSuccess.tsx"));
  const ResetPasswordError = lazy(() => import("../auth/reset-password/ResetPasswordError.tsx"));

  const [params] = useSearchParams();
  const oobCode = params.get("oobCode");

  const STATUS = {
    IDLE: 'default',
    SUCCESS: 'success',
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
  const [contentTitle, setContentTitle] = useState("Changement du mot de passe")
  const [contentLogoVariant, setContentLogoVariant] = useState<LogoVariantChoice>(LOGOVARIANT.DEFAULT)

  const handleResetPassword = async (password: string) => {

    if (!oobCode) return;

    try {
      await confirmReset(oobCode, password);
      setQueryStatus(STATUS.SUCCESS)
      setContentTitle("Mot de passe modifié!")
      setContentLogoVariant(LOGOVARIANT.SUCCESS)
      console.log("success - reset")
    }
    catch (err: any) {
      setQueryStatus(STATUS.ERROR)
      setContentTitle("Erreur rencontrée")
      setContentLogoVariant(LOGOVARIANT.ERROR)
    }
  };

  
  const content = (() => {
    switch (queryStatus) {
      case STATUS.IDLE:
        return <ResetPasswordForm handlerResetPassword={handleResetPassword} />;
      case STATUS.SUCCESS:
        return <Suspense fallback={<RecoveryPasswordSendSkeleton />}><ResetPasswordSuccess /></Suspense>
      case STATUS.ERROR:
        return <Suspense fallback={<RecoveryPasswordSendSkeleton />}><ResetPasswordError /></Suspense>
      default:
        return <ResetPasswordForm handlerResetPassword={handleResetPassword} />;
    }
  })();


  return (
    <AuthLayout logoVariant={contentLogoVariant} title={contentTitle}>
      {content}
    </AuthLayout>
  )
}


/*
<form onSubmit={handleSubmit}>
      <input
        type="password"
        maxLength={30}
        placeholder="Nouveau mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Valider</button>
    </form>
*/