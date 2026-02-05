import { Search } from 'lucide-react';
import './SearchBar.scss';
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-container">
      <div className="search-icon-wrapper">
        <Search className="search-icon" />
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Search users by name, email, or city..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
