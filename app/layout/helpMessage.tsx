export type HelpMessageProps = {
  head: string;
  additional?: string;
};

export default function HelpMessage(props: HelpMessageProps) {
  const { head, additional } = props;

  return (
    <div>
      <p className='font-semibold'>{head}</p>
      {additional && <p className='text-sm'>{additional}</p>}
    </div>
  );
}
