import { Mail, Navigation, Phone, Printer } from "lucide-react";
import { assets } from "@/assets/assets";

const address = "Post Box No. 1611\nPeelamedu\nCoimbatore - 641004";
const phone = "0422-2572177, 2572477, 4344777";
const fax = "0422-2592277";
const contact_link = "https://psgtech.edu/cont.php";


const Footer = () => {

    return <footer className="flex flex-col mt-2 justify-center items-center bg-gradient-to-bl from-indigo-800 via-blue-900 to-gray-800 text-white">
		<div className="flex flex-col lg:flex-row lg:my-10 p-5 items-center justify-center gap-10 lg:gap-50 ">
        
				<div className="flex flex-col px-10 py-5 gap-5 ">


					<a href={'https://psgtech.edu/'} className="my-5 z-1000">
						<img src={assets.psg_logo} className="h-[5rem]  border border-gray" alt="Logo"/>
					</a>
					
					<div className="flex flex-row gap-5 ">
						<Navigation size={25} className="mt-1"/>
						<div>
							{address.split("\n").map((value,key) => {
								return <p key={key}>{value}</p>
							})}
						</div>

					</div>

					<div className="flex flex-row gap-5 ">
						<Phone size={25} className="mt-1"/>
						<div>
							{phone.split("\n").map((value,key) => {
								return <p key={key}>{value}</p>
							})}
						</div>
					</div>

					<div className="flex flex-row gap-5 ">
						<Printer size={25} className="mt-1"/>
						<div>
							{fax.split("\n").map((value,key) => {
								return <p key={key}>{value}</p>
							})}
						</div>
					</div>

					<div className="flex flex-row gap-5 ">
						<Mail size={25} />
						<a href={contact_link}>Contact</a>
					</div>
					

				</div>

				<div className="flex flex-col border border-black">
						<a 
							href="https://www.google.com/maps/place/PSG+College+Of+Technology/@11.024689,77.002127,13z/data=!4m6!3m5!1s0x3ba8582f1435fa59:0x137d95bfd8909293!8m2!3d11.0242544!4d77.0028228!16zL20vMDJ6Nmd4?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D"
							className="h-[10rem] w-[15rem] md:h-[20rem] md:w-[30rem] z-1000"
							>
							<img src={assets.map} alt="" className="w-full h-full object-fit"/>
						</a>

				</div>
				
    </div>
		<div className="relative z-10 p-6 border-t w-[95%] border-white text-center ">
			<p>© 2025 PSG College of Technology. All rights reserved.</p>
		</div>
		
		</footer>


}


export default Footer;