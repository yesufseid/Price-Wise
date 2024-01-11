import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/icons/logo.svg"
import search from "../public/assets/icons/search.svg"
import balckheart from "../public/assets/icons/black-heart.svg"
import user from "../public/assets/icons/user.svg"


const Icons=[{icon:search,alt:"search"},{icon:balckheart,alt:"black-heart"},{icon:user,alt:"user"}]

export default function Navbar() {
  return (
   <header className="w-full">
      <nav className="nav">
        <Link href={"/"} className="flex justify-center gap-1">
         <Image 
         src={logo} 
         alt="logo"
         width={27}
         height={27}
         />
         <p  className="nav-logo">Price <span className="text-primary">Wise</span></p>
        </Link>
        <div className="flex justify-center gap-5">
            {Icons.map((icon)=>(
                <Image
                   key={icon.alt}
                   src={icon.icon}
                   alt={icon.alt}
                   width={28}
                   height={28}
                />
            ))}

        </div>
      </nav>
   </header>
  )
}
