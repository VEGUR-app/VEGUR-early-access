import { useInView } from '../hooks/useInView.js'

// Blendet Inhalte einmalig ein (max. 24px Bewegung). from: 'up' | 'right'
export default function Reveal({ as: Tag = 'div', from = 'up', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${from}${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
