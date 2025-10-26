import { cn } from '@/utils'

export const Table = ({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) => (
  <div className='my-8 w-full overflow-x-auto'>
    <table
      className={cn(
        'w-full border-collapse text-sm',
        'rounded-lg border border-border',
        className,
      )}
      {...props}
    />
  </div>
)

export const THead = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead
    className={cn('bg-surface-1 text-left font-semibold', className)}
    {...props}
  />
)

export const TBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
)

export const TR = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      'border-b border-border transition-colors',
      'hover:bg-surface-1',
      className,
    )}
    {...props}
  />
)

export const TH = ({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      'px-4 py-3 text-left align-middle font-semibold',
      '[&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
)

export const TD = ({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn(
      'px-4 py-3 align-middle',
      '[&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
)
