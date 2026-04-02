import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

export const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (values) => {
    try {
      await api.post('/auth/register/student', values);
      toast.success('Registered. Check OTP email.');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white rounded-xl p-6 shadow">
        <h1 className="text-2xl font-bold">Student Registration</h1>
        <input className="w-full border p-2 mt-4" placeholder="Full Name" {...register('fullName')} />
        <input className="w-full border p-2 mt-3" placeholder="Email" {...register('email')} />
        <input className="w-full border p-2 mt-3" type="password" placeholder="Password" {...register('password')} />
        <button className="w-full bg-cyan-600 text-white py-2 rounded mt-4">Create Account</button>
      </form>
    </div>
  );
};
