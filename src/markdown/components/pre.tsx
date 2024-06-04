type PreProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

export const Pre = (props: PreProps) => {
  return (
    <div className='relative'>
      <pre {...props} />
    </div>
  )
}
