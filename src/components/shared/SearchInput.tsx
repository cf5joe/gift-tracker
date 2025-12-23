import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceMs?: number;
  className?: string;
}

export default function SearchInput({
  placeholder = "Search...",
  onSearch,
  debounceMs = 300,
  className = ""
}: SearchInputProps) {
  const [value, setValue] = useState('');

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs, onSearch]);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-neutral-300 dark:border-slate-600 rounded-lg
                   bg-white dark:bg-slate-800 text-neutral-900 dark:text-white
                   placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                   focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                   transition-colors"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
