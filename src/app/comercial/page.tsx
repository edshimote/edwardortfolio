import { BusinessPortal } from "@/components/contact/BusinessPortal";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
export const metadata: Metadata={title:"Central administrativa",robots:{index:false,follow:false}};
export default function Page(){if(process.env.APP_MODE!=="admin")redirect("https://edwarddigital-admin.vercel.app");return <BusinessPortal admin/>;}
