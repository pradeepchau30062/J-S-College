import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { api } from '../../services/api';

export const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const onSubmit = async (values) => {
    try {
      await api.post('/auth/register/student', values);
      setEmail(values.email);
      toast.success('Registered. Check your email for OTP.');
      reset({ fullName: values.fullName, email: values.email, password: '' });
    } catch (e) {
      toast.error(e.response?.data?.message || 'Registration failed');
    }
  };

  const verifyOtp = async () => {
    try {
      await api.post('/auth/verify-otp', { email, otp });
      toast.success('Email verified. You can now login.');
    } catch (e) {
      toast.error(e.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <div className="w-full max-w-md space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl bg-white p-6 shadow dark:bg-slate-950">
          <h1 className="text-2xl font-bold">Student Registration</h1>
          <input className="mt-4 w-full rounded border p-2" placeholder="Full Name" {...register('fullName')} />
          <input className="mt-3 w-full rounded border p-2" placeholder="Email" {...register('email')} />
          <input className="mt-3 w-full rounded border p-2" type="password" placeholder="Password" {...register('password')} />
          <button className="mt-4 w-full rounded bg-cyan-600 py-2 text-white">Create Account</button>
        </form>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-950">
          <h2 className="font-semibold">Verify OTP</h2>
          <input className="mt-3 w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="mt-3 w-full rounded border p-2" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit OTP" />
          <button type="button" onClick={verifyOtp} className="mt-3 w-full rounded bg-slate-900 py-2 text-white">Verify Email</button>
        </div>
      </div>
    </div>
  );
};
