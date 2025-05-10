import { useRef } from "react";

export default function PhoneInput({ value, onChange }) {
  const inputRef = useRef(null);

  const formatPhone = (input) => {
    let cleaned = input.replace(/\D/g, '');
    let formatted = '';

    if (cleaned.length <= 2) {
      formatted = `(${cleaned}`;
    } else if (cleaned.length <= 6) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 10) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    } else {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }

    return formatted;
  };

  const handleChange = (e) => {
    const input = e.target;
    const cursor = input.selectionStart;
    const raw = input.value;

    const formatted = formatPhone(raw);

    onChange(formatted);

    setTimeout(() => {
      if (inputRef.current) {
        const diff = formatted.length - raw.length;
        const newCursor = cursor + diff;
        inputRef.current.setSelectionRange(newCursor, newCursor);
      }
    }, 0);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="(00) 00000-0000"
      maxLength={15}
    />
  );
}
