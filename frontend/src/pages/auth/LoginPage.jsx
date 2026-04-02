import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { setAuth } from '../../store/store';

export const LoginPage = () => {
  const { register, handleSubmit } = useForm({ defaultValues: { role: 'student' } });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await api.post('/auth/login', values);
      dispatch(setAuth({ token: data.accessToken, user: data.user }));
      toast.success('Login successful');
      navigate(`/${data.user.role}`);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-xl bg-white p-6 shadow dark:bg-slate-950">
        <h1 className="text-2xl font-bold">Multi Role Login</h1>
        <input className="mt-4 w-full rounded border p-2" placeholder="Email" {...register('email')} />
        <input className="mt-3 w-full rounded border p-2" type="password" placeholder="Password" {...register('password')} />
        <select className="mt-3 w-full rounded border p-2" {...register('role')}>
          <option value="student">Student</option><option value="teacher">Teacher</option><option value="librarian">Librarian</option><option value="cashier">Cashier</option><option value="admin">Admin</option>
        </select>
        <button className="mt-4 w-full rounded bg-slate-900 py-2 text-white">Sign In</button>
        <div className="mt-4 flex justify-between text-sm">
          <Link to="/register" className="text-cyan-600">Student Registration</Link>
          <Link to="/forgot-password" className="text-cyan-600">Forgot password?</Link>
        </div>
      </form>
    </div>
  );
};
