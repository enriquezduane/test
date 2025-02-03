import { useState } from 'react';
import styles from './../styles/LoginSignup.module.css';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        rememberMe: false
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' 
            ? e.target.checked 
            : e.target.value;
        
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            if (!formData.email || !formData.password) {
                setError('Please fill in all fields');
                return;
            }
        } else {
            if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
                setError('Please fill in all fields');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
        }

        console.log('Form submitted:', formData);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2 className={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <p className={styles.error}>{error}</p>}

                    {!isLogin && (
                        <div className={styles.inputGroup}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    )}

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className={styles.inputGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {isLogin&&(
                        <div className={styles.checkboxGroup}>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        <label htmlFor="rememberMe"> Remember me</label>
                    </div>
                    )}

                    <button type="submit" className={styles.submitButton}>
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>

                <p className={styles.toggleText}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className={styles.toggleButton}
                    >
                        {isLogin ? 'Sign up here' : 'Login here'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginSignup;
