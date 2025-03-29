import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function EditProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, userId } = useSelector(state => state.auth);
  const [newName, setNewName] = useState(userName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newName.trim() && newName !== userName) {
      try {
        await dispatch(updateUserProfile({ userId, newName })).unwrap();
        navigate('/');
      } catch (error) {
        console.error('Ошибка обновления:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Редактирование профиля</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Имя пользователя</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            minLength={3}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;