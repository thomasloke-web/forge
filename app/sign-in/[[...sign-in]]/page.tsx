import { SignIn } from "@clerk/nextjs"
export default function Page() {
  return <div className="min-h-[80vh] flex items-center justify-center px-5 py-16"><SignIn /></div>
}
