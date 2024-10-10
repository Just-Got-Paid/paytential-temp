import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // If the currentUser exists, redirect to their profile page
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    
    if (!username || !password || !email) {
      return setErrorText('Please fill in all required fields');
    }

    const [user, error] = await createUser({ username, password, email, organization, isAdmin });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'email') setEmail(value);
    if (name === 'organization') setOrganization(value);
    if (name === 'isAdmin') setIsAdmin(value === 'true'); // Convert the string to a boolean
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} aria-labelledby="create-heading">
        <h2 id="create-heading">Create New User</h2>
        
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <label htmlFor="email">Email</label>
        <input
          autoComplete="off"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
        />

        <label htmlFor="organization">Organization</label>
        <input
          autoComplete="off"
          type="text"
          id="organization"
          name="organization"
          onChange={handleChange}
          value={organization}
        />

        <label htmlFor="isAdmin">Are you an admin or a student?</label>
        <select
          id="isAdmin"
          name="isAdmin"
          onChange={handleChange}
          value={isAdmin}
        >
          <option value="false">Student</option>
          <option value="true">Admin</option>
        </select>

        <button>Sign Up Now!</button>
      </form>
      
      {!!errorText && <p>{errorText}</p>}
      <p>Already have an account with us? <Link to="/login">Log in!</Link></p>
    </>
  );
}


