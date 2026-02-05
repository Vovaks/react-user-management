import React, { useEffect, useState, ReactNode } from 'react';
import { X, Pencil } from 'lucide-react';
import { User } from '../../types/users.types';
import './UserModal.scss';

export type ModalMode = 'add' | 'view' | 'edit';

interface UserModalProps {
  isOpen: boolean;
  mode: ModalMode;
  initialUser?: User | null;
  onClose: () => void;
  onSave: (user: User | Omit<User, 'id'>) => void;
  onModeChange?: (mode: ModalMode) => void;
}

export function UserModal({
  isOpen,
  mode,
  initialUser,
  onClose,
  onSave,
  onModeChange,
}: UserModalProps) {
  const [visible, setVisible] = useState(isOpen);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    city: '',
    phone: '',
    website: '',
    companyName: '',
  });

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  /* ---------- form sync ---------- */
  useEffect(() => {
    if (isOpen && (mode === 'edit' || mode === 'view') && initialUser) {
      setFormData({
        name: initialUser.name,
        username: initialUser.username,
        email: initialUser.email,
        city: initialUser.address.city,
        phone: initialUser.phone,
        website: initialUser.website,
        companyName: initialUser.company.name,
      });
    } else if (isOpen && mode === 'add') {
      setFormData({
        name: '',
        username: '',
        email: '',
        city: '',
        phone: '',
        website: '',
        companyName: '',
      });
    }
  }, [isOpen, mode, initialUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'edit' && initialUser) {
      onSave({
        ...initialUser,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: {
          ...initialUser.address,
          city: formData.city,
        },
        company: {
          ...initialUser.company,
          name: formData.companyName,
        },
      });
    } else {
      onSave({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: {
          street: '',
          suite: '',
          city: formData.city,
          zipcode: '',
          geo: {
            lat: '',
            lng: '',
          },
        },
        company: {
          name: formData.companyName,
          catchPhrase: '',
          bs: '',
        },
      });
    }

    onClose();
  };

  const getTitle = () => {
    switch (mode) {
      case 'add':
        return 'Add New User';
      case 'edit':
        return 'Edit User';
      case 'view':
        return 'User Details';
    }
  };

  if (!visible) return null;

  const user = initialUser!;

  const fullAddress =
    `${user?.address?.street} ${user?.address?.suite} ${user?.address?.city} ${user?.address?.zipcode}`
      .replace(/,\s*$/, '')
      .trim();

  return (
    <>
      <div
        className={`modal-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      <div className="modal-container">
        <div className={`modal-content ${isOpen ? 'open' : ''}`}>
          <div className="modal-header">
            <h2 className="modal-title">{getTitle()}</h2>
            <button onClick={onClose} className="modal-close-btn">
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            {mode === 'view' ? (
              <div className="view-details">
                <Detail label="Name" value={user.name} />
                <Detail label="Username" value={user.username} />
                <Detail
                  label="Email"
                  value={
                    <a href={`mailto:${user.email}`} className="detail-link">
                      {user.email}
                    </a>
                  }
                />

                {fullAddress && <Detail label="Address" value={fullAddress} />}

                {user.phone.trim() && (
                  <Detail label="Phone" value={user.phone.trim()} />
                )}

                {user.website.trim() && (
                  <Detail
                    label="Website"
                    value={
                      <a
                        href={`https://${user.website.trim()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-link"
                      >
                        {user.website.trim()}
                      </a>
                    }
                  />
                )}

                {user.company.name.trim() && (
                  <Detail label="Company" value={user.company.name.trim()} />
                )}

                {user.company.catchPhrase.trim() && (
                  <Detail
                    label="Catch Phrase"
                    value={user.company.catchPhrase.trim()}
                  />
                )}

                {user.company.bs.trim() && (
                  <Detail label="BS" value={user.company.bs.trim()} />
                )}

                <div className="view-actions">
                  <button onClick={onClose} className="btn-secondary">
                    Close
                  </button>
                  {onModeChange && (
                    <button
                      onClick={() => onModeChange('edit')}
                      className="btn-primary"
                    >
                      <Pencil size={16} />
                      Edit User
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form">
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={v => setFormData({ ...formData, name: v })}
                  required={true}
                />
                <Input
                  label="Username"
                  value={formData.username}
                  onChange={v => setFormData({ ...formData, username: v })}
                  required={true}
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={v => setFormData({ ...formData, email: v })}
                  required={true}
                />
                <Input
                  label="City"
                  value={formData.city}
                  onChange={v => setFormData({ ...formData, city: v })}
                  required={true}
                />
                <Input
                  label="Phone"
                  value={formData.phone}
                  onChange={v => setFormData({ ...formData, phone: v })}
                  required={false}
                />
                <Input
                  label="Website"
                  value={formData.website}
                  onChange={v => setFormData({ ...formData, website: v })}
                  required={false}
                />
                <Input
                  label="Company Name"
                  value={formData.companyName}
                  onChange={v => setFormData({ ...formData, companyName: v })}
                  required={false}
                />

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {mode === 'add' ? 'Create User' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Detail({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="detail-group">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <input
        required={required}
        type={type}
        className="form-input"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
