import Link from "next/link";

export type BannerProps = {
  notificationCount?: number
}

export default function Banner(props: BannerProps) {
  const { notificationCount } = props;
  return (
    <div className=" flex items-center justify-center m-1">
      {notificationCount 
      && <Link href="/notifications" className="text-white bg-black   p-1 rounded ">You have {notificationCount} notification(s).</Link>}
    </div>
  )
}