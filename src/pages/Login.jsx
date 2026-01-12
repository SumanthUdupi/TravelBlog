import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/hooks';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(password)) {
            navigate('/admin');
        } else {
            setError('Invalid Access Code');
        }
    };

    return (
        <div className="container section fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', border: '1px solid var(--color-border-subtle)', borderRadius: '8px' }}>
                <h2 className="text-center" style={{ marginBottom: '1.5rem' }}>Curator Access</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Access Code"
                            className="form-control"
                            style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-primary)' }}
                        />
                    </div>
                    {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Enter</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
