import React from 'react';
import UsersContext from '../../contexts/UsersContext';
import './AdminUsers.css';

function AdminUsers({ onOpenPopupUserInfo }) {
  const users = React.useContext(UsersContext);

  return (
    <div className="admin-users">
      <h1 className="admin-users__title">Управление пользователями</h1>

      <div className="admin-users__list">
        {users.map(elem =>
          <button
            className="admin-films__card-button"
            type="button"
            key={elem._id}
            onClick={() => onOpenPopupUserInfo(elem)}
          >{elem.userName}&nbsp;<span style={{ fontWeight: '300', fontSize: '20px' }}>({elem.email})</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;