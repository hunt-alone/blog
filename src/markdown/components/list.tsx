import { cn } from '@/utils'

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}

export const List = ({ children, className, ...rest }: ListProps) => {
  return (
    <ul
      {...rest}
      className={cn(
        className,
        'list-disc space-y-3 pl-6 text-[1.05rem] leading-[1.85] text-slate-700 marker:text-slate-400 dark:text-slate-200 dark:marker:text-slate-500',
      )}
    >
      {children}
    </ul>
  )
}
