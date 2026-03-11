const variants = {
    primary:   'bg-gray-900 text-white hover:bg-gray-800 shadow-lg',
    secondary: 'bg-white text-gray-900 hover:bg-gray-50 shadow-lg shadow-gray-200/50 border border-gray-200',
    outline:   'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
    ghost:     'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
};

const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-base gap-2',
    lg: 'px-7 py-3.5 text-lg gap-2.5',
};

const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
};

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    icon,
    iconPosition = 'right',
    disabled = false,
    ...props
}) => {
    return (
        <button
            disabled={disabled}
            className={`
                inline-flex items-center justify-center font-semibold
                rounded-full transition-all duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                disabled:opacity-50 disabled:cursor-not-allowed
                active:scale-95 active:shadow-none
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            {...props}
        >
            {icon && iconPosition === 'left'  && <span className={`shrink-0 ${iconSizes[size]}`}>{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className={`shrink-0 ${iconSizes[size]}`}>{icon}</span>}
        </button>
    );
};

export default Button;