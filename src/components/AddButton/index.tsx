import { Plus } from 'lucide-react';
import './AddButton.scss';
interface AddButtonProps {
  onClick: () => void;
}
export function AddButton({ onClick }: AddButtonProps) {
  return (
    <button onClick={onClick} className="add-button" aria-label="Add new user">
      <Plus className="add-icon" />
    </button>
  );
}
