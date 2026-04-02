import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';

export const ResetPasswordPage = () => {
  const [params] = useSearchParams();
  const { register, handleSubmit } = useForm({ defaultValues: { token: params.get('token') || '' } });

  const onSubmit = async (values) => {
    try {
      await api.post('/auth/reset-password', values);
      toast.success('Password reset successful');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-xl bg-white p-6 shadow dark:bg-slate-950">
        <h1 className="text-xl font-bold">Reset Password</h1>
        <input className="mt-3 w-full rounded border p-2" placeholder="Token" {...register('token')} />
        <input className="mt-3 w-full rounded border p-2" type="password" placeholder="New password" {...register('password')} />
        <button className="mt-3 w-full rounded bg-slate-900 py-2 text-white">Reset</button>
      </form>
    </div>
  );
};
