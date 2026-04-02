import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

export const LoginPage = () => {
  const { register, handleSubmit } = useForm({ defaultValues: { role: 'student' } });
  const onSubmit = async (values) => {
    try {
      const { data } = await api.post('/auth/login', values);
      localStorage.setItem('token', data.accessToken);
      toast.success('Login successful');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white rounded-xl p-6 shadow">
        <h1 className="text-2xl font-bold">Multi Role Login</h1>
        <input className="w-full border p-2 mt-4" placeholder="Email" {...register('email')} />
        <input className="w-full border p-2 mt-3" type="password" placeholder="Password" {...register('password')} />
        <select className="w-full border p-2 mt-3" {...register('role')}>
          <option value="student">Student</option><option value="teacher">Teacher</option><option value="librarian">Librarian</option><option value="cashier">Cashier</option><option value="admin">Admin</option>
        </select>
        <button className="w-full bg-slate-900 text-white py-2 rounded mt-4">Sign In</button>
      </form>
    </div>
  );
};
