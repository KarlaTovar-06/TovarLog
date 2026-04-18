// src/components/ui/Button.tsx
type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
    fullWidth?: boolean
  }
  
  export function Button({
    children, onClick, type = 'button',
    variant = 'primary', disabled, fullWidth
  }: ButtonProps) {
    const base = 'py-4 px-6 rounded-2xl text-xl font-bold transition-all active:scale-95 disabled:opacity-50'
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    }
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
      >
        {children}
      </button>
    )
  }