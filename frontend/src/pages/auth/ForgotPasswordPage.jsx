import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

export const ForgotPasswordPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (values) => {
    try {
      await api.post('/auth/forgot-password', values);
      toast.success('If account exists, reset email sent.');
    } catch {
      toast.error('Request failed');
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-xl bg-white p-6 shadow dark:bg-slate-950">
        <h1 className="text-xl font-bold">Forgot Password</h1>
        <input className="mt-3 w-full rounded border p-2" placeholder="Email" {...register('email')} />
        <button className="mt-3 w-full rounded bg-slate-900 py-2 text-white">Send Reset Link</button>
      </form>
    </div>
  );
};
