import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setIsLoading(true);

    try {
      // Perform the login request to your backend API here
      const response = await fetch('http://localhost:5000/api/v1/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed!');
      }

      const data = await response.json();
      // Handle successful login (e.g., store token, redirect)
      console.log(data);

    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='px-5 lg:px-0'>
      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
          Hello! <span className='text-blue-600'>Welcome</span> Back
        </h3>

        <form className='py-4 md:py-0' onSubmit={handleSubmit}>
          <div className='mb-5'>
            <input 
            type="email" 
            placeholder='Enter Your Email' 
            name='email' 
            value={formData.email} 
            onChange={handleInputChange} 
            required
            className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-sky-600 text-[16px]
            leading-7 text-headingColor placeholder:text-black rounded-md cursor-pointer'/>
          </div>

          <div className='mb-5'>
            <input 
            type="password" 
            placeholder='Enter Your Password' 
            name='password' 
            value={formData.password} 
            onChange={handleInputChange} 
            required
            className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-sky-600 text-[16px]
            leading-7 text-headingColor placeholder:text-black rounded-md cursor-pointer'/>
          </div>

          <div className='mt-7'>
            <button 
              type='submit' 
              className='w-full bg-blue-500 text-white leading-[30px] rounded-lg px-4 py-3' 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <p className='mt-5 text-textColor text-center'>
            Don&apos;t have an account? 
            <Link className="text-blue-600 font-medium ml-1" to="/api/signup">Register</Link>
          </p>

        </form>
      </div>
    </section>
  )
}

export default Login